
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username.trim() && password.trim()) { 
            localStorage.setItem('username', username);
            navigate('/play');
        } else {
            alert('Please enter both a username and a password.');
        }
    };

    useEffect(() => {
        fetch('/api/test')
            .then(res => res.json())
            .then(data => {
                console.log('Message from backend:', data.message);
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }, []);

    return (
        <div className="info">
            <h2>Rocket League Crate Opening Simulator</h2>
            
            <label htmlFor="username">Username:</label>
            <input 
                type="text" 
                id="username" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />

            <label htmlFor="pass">Password:</label>
            <input 
                type="password" 
                id="pass" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />

            <br />
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
