// Import necessary modules
const { MongoClient } = require('mongodb');  // MongoDB driver
const config = require('./dbConfig.json');  // Import the dbConfig.json

// MongoDB connection string, using the values from dbConfig.json
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

// Create a new MongoClient instance
const client = new MongoClient(url);

// Database and collection names
const db = client.db('simon');  // The name of your database (can be changed if needed)
const userCollection = db.collection('user');  // User collection
const scoreCollection = db.collection('score');  // Score collection

// Test the connection to the database
async function testConnection() {
  try {
    // Ping the database to check the connection
    await db.command({ ping: 1 });
    console.log(`Successfully connected to the database`);
  } catch (ex) {
    console.log(`Failed to connect to the database: ${ex.message}`);
    process.exit(1);  // Exit the process if the connection fails
  }
}

// Call the test connection function
testConnection();
