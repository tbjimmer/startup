import React from 'react';
import React, { useState } from 'react';
import './play.css';

export function Play() {

    const [crateCount, setCrateCount] = useState(1);
    const [results, setResults] = useState([]);

    const rarityOdds = [
        { rarity: 'Rare', chance: 55 }, 
        { rarity: 'Very Rare', chance: 28 },
        { rarity: 'Import', chance: 12 },
        { rarity: 'Exotic', chance: 4 },
        { rarity: 'Black Market', chance: 1 }
    ];

    const getRandomRarity = () => {
        const randomNum = Math.random() * 100;
        let cumulativeChance = 0;

        for (const { rarity, chance } of rarityOdds) {
            cumulativeChance += chance;
            if (randomNum <= cumulativeChance) {
                return rarity;
            }
        }
    };

    const openCrates = (count) => {
        const newResults = [];
        for (let i = 0; i < count; i++) {
            const rarity = getRandomRarity();
            newResults.push(rarity);
        }
        setResults((prevResults) => [...prevResults, ...newResults]);
    };

    return (
        <div className="info">
            <h2>Open Crates</h2>

            <div className="grid-container">
                <section className="crate-selection">
                    <fieldset>
                        <label htmlFor="single">Single Crate</label>
                        <input type="radio" id="single" name="crateMode" defaultChecked />
                        <label htmlFor="multiple">Multiple Crates</label>
                        <input type="radio" id="multiple" name="crateMode" value="multiple" />            
                    </fieldset>
                    <div>
                        <label htmlFor="range">Crates</label>
                        <input 
                            type="range" 
                            name="varRange" 
                            id="range" 
                            min="1" 
                            max="100" 
                            step="1" 
                            value={crateCount} 
                            onChange={(e) => setCrateCount(Number(e.target.value))}
                        />
                        <output id="rangeOutput">{crateCount}</output>

                    </div>
                    <div>
                        <label htmlFor="select">Select: </label>
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
                                <td>{results.length}</td>
                                <td>{results.filter(r => r === 'Rare').length}</td>
                                <td>{results.filter(r => r === 'Very Rare').length}</td>
                                <td>{results.filter(r => r === 'Import').length}</td>
                                <td>{results.filter(r => r === 'Exotic').length}</td>
                                <td>{results.filter(r => r === 'Black Market').length}</td>

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