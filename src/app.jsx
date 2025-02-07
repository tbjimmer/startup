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
            <header className="d-flex flex-wrap align-items-center justify-content-md-between py-3 mb-4 px-3 border-bottom border-dark border-3 rounded">
                <nav className = "d-flex align-items-center col-auto text-dark text-decoration-none">
                        <NavLink className='nav-item' to='home'>
                        <div id="logo" className="dominuslogo">
                            <img src="dominuslogo.jpg" alt="random" />
                        </div>
                        </NavLink>
                        <h1>
                            CS 260 Startup
                        </h1>
                </nav>
                    <menu className="nav col-md-auto mb-3 justify-content-right">
                        <li> <NavLink className='nav-link' to='/'>Home</NavLink> </li>
                        <li> <NavLink className='nav-link' to='play'>Play</NavLink> </li>
                        <li> <NavLink className='nav-link' to='scoreboard'>Scoreboard</NavLink> </li>
                        <li><a href="https://github.com/tbjimmer/startup" className="nav-link px-2 link-primary">GitHub</a></li>
                    </menu>
                
            </header>

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
  