const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database'); // This assumes database.js is in the same directory

const app = express();
app.use(cors());
app.use(express.json());

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// 🔹 Connect to MongoDB on startup
db.connectDB()
  .then(() => console.log("MongoDB connected!"))
  .catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

// 🔹 Test endpoint
app.get('/api/test', (req, res) => {
  console.log("Received request at /api/test");
  res.json({ message: "Backend working!" });
});

// 🔹 Serve static frontend
app.use(express.static('public'));

// 🔹 API: Update leaderboard (called after each crate opening)
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

// 🔹 API: Get leaderboard
app.get('/api/leaderboard', async (_req, res) => {
  try {
    const leaderboard = await db.getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 🔹 Catch-all route for unknown paths
app.use((_req, res) => {
  res.status(404).send({ msg: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
