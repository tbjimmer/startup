const { MongoClient } = require('mongodb');
const uri = 'your_mongo_connection_string'; // Use your actual MongoDB connection string
const client = new MongoClient(uri);

let database;
let scoreCollection;

async function connectDB() {
    await client.connect();
    database = client.db('simondb');
    scoreCollection = database.collection('leaderboard');
}

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

module.exports = {
    connectDB,
    getLeaderboard,
    updateLeaderboard,
};
