import React, { useState, useEffect } from 'react';
import './scoreboard.css';

export function Scoreboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    const loadLeaderboard = () => {
        const updatedData = JSON.parse(localStorage.getItem('leaderboard')) || [];

        updatedData.sort((a, b) => b.totalCrates - a.totalCrates);

        setLeaderboard(updatedData);
    };

    useEffect(() => {
        loadLeaderboard(); 

        // Check for local storage changes
        const handleStorageChange = () => {
            loadLeaderboard();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
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
                                <td className="rare">{player.Rare}</td>
                                <td className="very-rare">{player['Very Rare']}</td>
                                <td className="import">{player.Import}</td>
                                <td className="exotic">{player.Exotic}</td>
                                <td className="black-market">{player['Black Market']}</td>
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
