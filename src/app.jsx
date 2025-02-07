import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Play } from './play/play';
import { Scoreboard } from './scoreboard/scoreboard';

export default function App() {
    return(
        <BrowserRouter>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 px-3 border-bottom border-dark border-3 rounded">
            <a href="/" className="d-flex align-items-center col-auto text-dark text-decoration-none">
                <div className="dominuslogo">  
                    <div id="dominuslogo" className="picture-box"><img src="dominuslogo.jpg" alt="random" /></div>
                </div>
                <h1>
                    CS 260 Startup
                </h1>
            </a>
                {/* <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> */}
                <menu className='nav-bar'>
                    <li> <NavLink className='nav-link' to='home'>Home</NavLink> </li>
                    <li> <NavLink className='nav-link' to='play'>Play</NavLink> </li>
                    <li> <NavLink className='nav-link' to='scoreboard'>Scoreboard</NavLink> </li>
                    <li><a href="https://github.com/tbjimmer/startup" className="nav-link px-2 link-primary">GitHub</a></li>
                </menu>
            </header>

            <Routes>
                <Route path='/' element={<Home />} exact />
                <Route path='/play' element={<Play />} />
                <Route path='/scores' element={<Scoreboard />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <div className="container">
                <footer>
                <menu className='nav-bar'>
                    <li> <NavLink className='nav-link' to='home'>Home</NavLink> </li>
                    <li> <NavLink className='nav-link' to='play'>Play</NavLink> </li>
                    <li> <NavLink className='nav-link' to='scoreboard'>Scoreboard</NavLink> </li>
                    <li><a href="https://github.com/tbjimmer/startup" className="nav-link px-2 link-primary">GitHub</a></li>
                </menu>
                    <p className="text-center text-black"> Tyler Brown&trade;</p>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <h2>404 - Page Not Found</h2>;
}
  