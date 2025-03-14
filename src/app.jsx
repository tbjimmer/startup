import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './home/home';
import { Play } from './play/play';
import { Scoreboard } from './scoreboard/scoreboard';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} exact />
                <Route path='/play' element={<Play />} />
                <Route path='/scoreboard' element={<Scoreboard />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <div className="container">
                <footer>
                    <menu className='nav justify-content-center border-bottom border-light border-2 pb-2 mb-2'>
                        <li> <NavLink className='nav-link' to='/'>Home</NavLink> </li>
                        <li> <NavLink className='nav-link' to='/play'>Play</NavLink> </li>
                        <li> <NavLink className='nav-link' to='/scoreboard'>Scoreboard</NavLink> </li>
                        <li><a href="https://github.com/tbjimmer/startup" className="nav-link px-2 link-primary">GitHub</a></li>
                    </menu>
                    <p className="text-center text-black">Tyler Brown&trade;</p>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function Header() {
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('username') || null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        setLoggedInUser(null);
        navigate('/');
    };

    const handleLogin = () => {
        const storedUser = localStorage.getItem('username');
        setLoggedInUser(storedUser); // Update state immediately
        navigate('/'); // Redirect to home
    };

    useEffect(() => {
        const updateUser = () => {
            setLoggedInUser(localStorage.getItem('username'));
        };

        window.addEventListener('storage', updateUser);
        return () => window.removeEventListener('storage', updateUser);
    }, []);

    // Extra check to force state update when localStorage changes
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('username'));
    }, [localStorage.getItem('username')]);

    return (
        <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 px-3 border-bottom border-dark border-3 rounded">
            {/* Logo & Title */}
            <nav className="d-flex align-items-center col-auto text-dark text-decoration-none">
                <NavLink className='nav-item' to='/'>
                    <div id="logo" className="dominuslogo">
                        <img src="dominuslogo.jpg" alt="Logo" />
                    </div>
                </NavLink>
                <h1>CS 260 Startup</h1>
            </nav>

            <menu className="nav mx-auto text-center d-flex gap-4">
                <li> <NavLink className='nav-link' to='/'>Home</NavLink> </li>
                <li> <NavLink className='nav-link' to='/play'>Play</NavLink> </li>
                <li> <NavLink className='nav-link' to='/scoreboard'>Scoreboard</NavLink> </li>
                <li><a href="https://github.com/tbjimmer/startup" className="nav-link px-2 link-primary">GitHub</a></li>
            </menu>

            <div className="user-auth ms-auto">
                {loggedInUser ? (
                    <button className="btn btn-lightpink px-3 py-1" onClick={handleLogout}>
                        {loggedInUser} Logout
                    </button>
                ) : (
                    <button className="btn btn-primary px-3 py-1" onClick={handleLogin}>
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}


function NotFound() {
    return <h2>404 - Page Not Found</h2>;
}
