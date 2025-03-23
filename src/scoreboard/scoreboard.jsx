import React, { useState, useEffect } from 'react';
import './scoreboard.css';

export function Scoreboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const currentUser = localStorage.getItem('username');

    // Load leaderboard data from the backend
    const loadLeaderboard = async () => {
        try {
            const response = await fetch('/api/leaderboard');
            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard data');
            }
            const data = await response.json();
            // Sort data in descending order by totalCrates (if not already sorted by backend)
            const sortedData = data.sort((a, b) => b.totalCrates - a.totalCrates);
            setLeaderboard(sortedData);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            alert('Error fetching leaderboard data from the server.');
        }
    };

    useEffect(() => {
        loadLeaderboard();
    }, []);

    return (
        <div className="container">
            <h2>Scoreboard</h2>
            <table className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>User</th>
                        <th>Crates Opened</th>
                        <th className="rare">Rare</th>
                        <th className="very-rare">Very Rare</th>
                        <th className="import">Import</th>
                        <th className="exotic">Exotic</th>
                        <th className="black-market">Black Market</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.length > 0 ? (
                        leaderboard.map((player, index) => (
                            <tr 
                                key={index} 
                                className={player.username === currentUser ? 'bold' : ''}
                            >
                                <td>{player.username}</td>
                                <td>{player.totalCrates}</td>
                                <td className="rare">{player.Rare || 0}</td>
                                <td className="very-rare">{player['Very Rare'] || 0}</td>
                                <td className="import">{player.Import || 0}</td>
                                <td className="exotic">{player.Exotic || 0}</td>
                                <td className="black-market">{player['Black Market'] || 0}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
