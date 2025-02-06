import React from 'react';
// import './login.css';

export function Login() {
    return (
        <div class="info">
            <h2>
                Rocket League Crate Opening Simulator
            </h2>
            <label for="username">Username: </label>
            <input type="text" id="username" name="vaUsername" required />
            <br>

            <label for="pass">Password: </label>
            <input type="password" id="pass" name="vaPass" required />
            <br>
            <button type="button" class="btn btn-primary mt-1">Login</button>
        </div>
    );
}