import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    return(
        <BrowserRouter>
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 px-3 border-bottom border-dark border-3 rounded">
            <a href="/" class="d-flex align-items-center col-auto text-dark text-decoration-none">
                <div class="dominuslogo">
                    <img src="dominuslogo.jpg" alt="logo">  
                </div>
                <h1>
                    CS 260 Startup
                </h1>
            </a>
                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="index.html" class="nav-link px-2 link-dark">Home</a></li>
                    <li><a href="play.html" class="nav-link px-2 link-dark">Play</a></li>
                    <li><a href="scoreboard.html" class="nav-link px-2 link-dark">Scoreboard</a></li>
                    <li><a href="https://github.com/tbjimmer/startup" class="nav-link px-2 link-primary">GitHub</a></li>
        </header>
        </BrowserRouter>
    );
}