import React, { useState, useEffect } from 'react';
import './scoreboard.css';

export function Scoreboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    // Load leaderboard data from the backend
    const loadLeaderboard = async () => {
        try {
            const response = await fetch('/api/leaderboard');
            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard data');
            }
            const data = await response.json();
            setLeaderboard(data);
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
                            <tr key={index}>
                                <td>{player.username}</td>
                                <td>{player.totalCrates}</td>
                                <td className="rare">{player.rare}</td>
                                <td className="very-rare">{player.veryRare}</td>
                                <td className="import">{player.import}</td>
                                <td className="exotic">{player.exotic}</td>
                                <td className="black-market">{player.blackMarket}</td>
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
