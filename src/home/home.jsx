import React from 'react';

export function Home() {
    return (
        <div className="info">
            <h2>
                Rocket League Crate Opening Simulator
            </h2>
            <label for="username">Username: </label>
            <input type="text" id="username" name="vaUsername" required />

            <label for="pass">Password: </label>
            <input type="password" id="pass" name="vaPass" required />
            <button type="button" className="btn btn-primary mt-1">Login</button>
        </div>
    );
}