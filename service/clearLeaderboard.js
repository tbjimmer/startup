const fetch = require('node-fetch'); // Ensure you installed node-fetch@2

async function clearLeaderboard() {
    try {
        const response = await fetch('http://localhost:4000/api/clear-leaderboard', {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Leaderboard cleared successfully.');
        } else {
            console.error('Failed to clear leaderboard. Status:', response.status);
        }
    } catch (error) {
        console.error('Error clearing leaderboard:', error);
    }
}

clearLeaderboard();
