const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(uri);

let database;
let scoreCollection;
let userCollection; // Collection for user data

// Connect to MongoDB and initialize collections
async function connectDB() {
    await client.connect();
    database = client.db('cluster0');
    scoreCollection = database.collection('leaderboard');
    userCollection = database.collection('users'); // Initialize the users collection
}

// Leaderboard functions
async function getLeaderboard() {
    const query = {};  // Fetch all leaderboard data
    const options = {
        sort: { totalCrates: -1 },
        limit: 10, // Return top 10 players
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
}

async function updateLeaderboard(username, result) {
    const leaderboard = await scoreCollection.findOne({ username });
    if (leaderboard) {
        // Update the existing player's score
        await scoreCollection.updateOne(
            { username },
            { $inc: { totalCrates: 1, [result.rarity]: 1 } }
        );
    } else {
        // Insert new player if they don't exist
        await scoreCollection.insertOne({
            username,
            totalCrates: 1,
            [result.rarity]: 1,
        });
    }
}

// User management functions
async function getUser(username) {
    return userCollection.findOne({ username });
}

async function addUser(user) {
    return userCollection.insertOne(user);
}

async function updateUser(user) {
    return userCollection.updateOne({ username: user.username }, { $set: user });
}

async function getUserByToken(token) {
    return userCollection.findOne({ token });
}

module.exports = {
    connectDB,
    getLeaderboard,
    updateLeaderboard,
    getUser,
    addUser,
    updateUser,
    getUserByToken,
};
