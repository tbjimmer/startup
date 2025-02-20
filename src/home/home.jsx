import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username.trim() && password.trim()) {
            localStorage.setItem('username', username);
            navigate('/play');
        } else {
            alert('Please enter both username and password.');
        }
    };

    return (
        <div className="info">
            <h2>Rocket League Crate Opening Simulator</h2>
            <label htmlFor="username">Username:</label>
            <input 
                type="text" 
                id="username" 
                name="vaUsername" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />

            <label htmlFor="pass">Password:</label>
            <input 
                type="password" 
                id="pass" 
                name="vaPass" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />

            <button 
                type="button" 
                className="btn btn-primary mt-1" 
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
}
