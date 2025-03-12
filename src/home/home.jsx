import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 🚀 Helper function to validate input
    const isValidInput = (user, pass) => {
        return user.length >= 3 && pass.length >= 3 && !user.includes(" ");
    };

    const handleCreateAccount = () => {
        if (isValidInput(username, password)) {
            // ✅ Load existing users from localStorage (or start with an empty object)
            let users = JSON.parse(localStorage.getItem('users')) || {};

            // ❌ Prevent duplicate usernames
            if (users[username]) {
                alert('Username already exists. Please choose a different one.');
                return;
            }

            // ✅ Store new user in localStorage
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));

            alert(`Account created for "${username}"! Logging you in...`);

            // ✅ Log the user in automatically
            localStorage.setItem('username', username);
            navigate('/play');
        } else {
            alert('Username & Password must be at least 3 characters, and username cannot contain spaces.');
        }
    };

    const handleLogin = () => {
        if (isValidInput(username, password)) {
            // ✅ Load users from localStorage
            let users = JSON.parse(localStorage.getItem('users')) || {};

            // ❌ Check if the username exists
            if (!users[username]) {
                alert('Invalid username or password.');
                return;
            }

            // ❌ Check if the password matches
            if (users[username] !== password) {
                alert('Invalid username or password.');
                return;
            }

            // ✅ Successful login
            localStorage.setItem('username', username);
            navigate('/play');
        } else {
            alert('Username & Password must be at least 3 characters, and username cannot contain spaces.');
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
                className="btn btn-success mt-1 mx-2" 
                onClick={handleCreateAccount}
            >
                Create Account
            </button>

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
