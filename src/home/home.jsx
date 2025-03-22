import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Helper function to validate input
    const isValidInput = (user, pass) => {
        return user.length >= 3 && pass.length >= 3 && !user.includes(" ");
    };

    const handleCreateAccount = async () => {
        if (isValidInput(username, password)) {
            try {
                // Send a POST request to the backend to register the user
                const response = await fetch('http://localhost:3000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Account created for "${username}"! Logging you in...`);

                    // Log the user in automatically
                    localStorage.setItem('username', username);
                    localStorage.setItem('token', data.token); // Save token to localStorage

                    // Navigate to the play page
                    navigate('/play');
                } else {
                    alert(data.msg || 'Error creating account.');
                }
            } catch (error) {
                console.error('Error registering user:', error);
                alert('Error registering user.');
            }
        } else {
            alert('Username & Password must be at least 3 characters, and username cannot contain spaces.');
        }
    };

    const handleLogin = async () => {
        if (isValidInput(username, password)) {
            try {
                // Send a POST request to the backend to log in the user
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Welcome, ${data.username}!`);

                    // Store the username and token
                    localStorage.setItem('username', username);
                    localStorage.setItem('token', data.token); // Save token to localStorage

                    // Navigate to the play page
                    navigate('/play');
                } else {
                    alert(data.msg || 'Invalid username or password.');
                }
            } catch (error) {
                console.error('Error logging in user:', error);
                alert('Error logging in user.');
            }
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