import React from 'react';
import './play.css';

export function Play() {
    return (
        <div className="info">
            <h2>Open Crates</h2>
            <div className="grid-container">
                <section className="crate-selection">
                    <fieldset>
                        <label for="single">Single Crate</label>
                        <input type="radio" id="single" name="crateMode" value="single" checked />
                        <label for="multiple">Multiple Crates</label>
                        <input type="radio" id="multiple" name="crateMode" value="multiple" />            
                    </fieldset>
                    <div>
                        <label for="range">Crates</label>
                        <input type="range" name="varRange" id="range" min="0" max="100" step="1" value="0" />
                        <output id="rangeOutput" for="range">0</output>
                    </div>
                    <div>
                        <label for="select">Select: </label>
                        <select id="select" name="varSelect">
                            <option>Accelerator Crate</option>
                            <option>Impact Crate</option>
                            <option>Turbo Crate</option>
                            <option>Vindicator Crate</option>
                        </select>
                        <div id="accelerator" className="picture-box"><img src="accelerator.jpg" alt="random" /></div>
                        <button type="button" className="btn btn-success mt-1">Open</button>
                    </div>
                </section>

                <section className="session-info">
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Session Total</th>
                                <th>Rare</th>
                                <th>Very Rare</th>
                                <th>Import</th>
                                <th>Exotic</th>
                                <th>Black Market</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10</td>
                                <td>6</td>
                                <td>3</td>
                                <td>1</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="recent-openings">
                    <fieldset>
                        <legend className="recent">Recent Crate Openings</legend>
                        <p>Player2 opened (Import) Tachyon</p>
                        <p>Player4 opened (Very Rare) Bob's Ramen</p>
                        <p>Player3 opened (Rare) Suji</p>
                        <p>Player2 opened (Rare) Ouchie</p>
                        <p>Player3 opened (Exotic) Creeper</p>

                    </fieldset>
                </section>

                <section className="just-opened">
                    <p className="opened">Singularity - Black Market</p>
                </section>
            </div>
        </div>
    );
}