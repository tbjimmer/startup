const express = require('express');
const cors = require('cors');
const db = require('./database'); // Ensure database.js exports the required functions
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { peerProxy } = require('./peerProxy');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Connect to MongoDB on startup
db.connectDB()
  .then(() => console.log("MongoDB connected!"))
  .catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log("Received request at /api/test");
  res.json({ message: "Backend working!" });
});

// Serve static frontend
app.use(express.static('public'));

// API: Update leaderboard (called after each crate opening)
app.post('/api/update-leaderboard', async (req, res) => {
  const { username, result } = req.body;
  if (!username || !result || !result.rarity) {
    return res.status(400).json({ message: 'Invalid request data' });
  }
  try {
    await db.updateLeaderboard(username, result);
    res.status(200).json({ message: 'Leaderboard updated' });
  } catch (err) {
    console.error('Error updating leaderboard:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API: Get leaderboard
app.get('/api/leaderboard', async (_req, res) => {
  try {
    const leaderboard = await db.getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register new user
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  try {
    const existingUser = await db.getUser(username);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, token: uuid.v4() };
    await db.addUser(user);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// User login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  try {
    const user = await db.getUser(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate a new token for the session
    user.token = uuid.v4();
    await db.updateUser(user);
    // Optionally, set a cookie (if needed) using cookie-parser
    res.status(200).json({ message: "User logged in successfully!", username: user.username, token: user.token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// User logout
app.delete('/auth/logout', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }
  try {
    const user = await db.getUserByToken(token);
    if (user) {
      delete user.token;
      await db.updateUser(user);
    }
    res.clearCookie('token');
    res.status(204).end();
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json({ message: "Logout failed" });
  }
});

// API: Clear the leaderboard
app.delete('/api/clear-leaderboard', async (req, res) => {
  try {
      await db.clearLeaderboard();
      res.status(200).json({ message: 'Leaderboard cleared' });
  } catch (error) {
      console.error('Error clearing leaderboard:', error);
      res.status(500).json({ message: 'Error clearing leaderboard' });
  }
});

// Catch-all route for unknown paths
app.use((_req, res) => {
  res.status(404).send({ msg: 'Not Found' });
});


httpServer.listen(port, () => {
  console.log(`🚀 Listening on port ${port}`);
});

peerProxy(httpServer);
