import React, { useState } from 'react';
import './play.css';

export function Play() {
    const [crateCount, setCrateCount] = useState(1);
    const [crateMode, setCrateMode] = useState("single");
    const [sessionResults, setSessionResults] = useState([]); 
    const [recentResults, setRecentResults] = useState([]);
    const [selectedCrate, setSelectedCrate] = useState("Accelerator");

    const rarityOdds = [
        { rarity: 'Rare', chance: 55 },
        { rarity: 'Very Rare', chance: 28 },
        { rarity: 'Import', chance: 12 },
        { rarity: 'Exotic', chance: 4 },
        { rarity: 'Black Market', chance: 1 }
    ];

    const crateItems = {
        'Accelerator': {
            'Rare': ['Pearlescent (Matte)', 'Critters', 'Splatter', 'Chainsaw', 'Gigapede'],
            'Very Rare': ['Gaiden', 'Hot Rocks', 'Lightning'],
            'Import': ['Jäger 619', 'Power-Shot', 'Saptarishi', 'Snakeskin'],
            'Exotic': ['Clockwork', 'Chrono'],
            'Black Market': ['Party Time', 'Fireworks', 'Hellfire', 'Popcorn']
        },
        'Impact': {
            'Rare': ['Staredown', 'Splashback', 'Windswept', 'Sundae'],
            'Very Rare': ['Masato', 'Burnout', 'Migraine', 'Reaper'],
            'Import': ['Twinzer', 'Enchanter', 'Cirrus'],
            'Exotic': ['Santa Fe', 'Centro'],
            'Black Market': ['Atomizer', 'Juiced', 'Fire God', 'Streamline']
        },
        'Turbo': {
            'Rare': ['Heiwa', 'Kawaii', 'Griffon', 'Suji', 'Aqueous'],
            'Very Rare': ['Snakeskin', 'Xenosplash', 'Septem', 'Vector'],
            'Import': ['Furry', 'Tachyon', 'Endo'],
            'Exotic': ['Roulette', 'Kalos'],
            'Black Market': ['20XX', 'Biomass', 'Hexed', 'Tora']
        },
        'Vindicator': {
            'Rare': ['Abtruse', 'Ouchie', 'Edge Burst', 'Clodhopper', 'OR-AISE'],
            'Very Rare': ['Picket', 'Truncheon', 'Kana'],
            'Import': ['Apparatus', 'Sentinel', 'Ninja Star'],
            'Exotic': ['NeYoYo', 'Creeper'],
            'Black Market': ['Shattered', 'Glorifier', 'Neuro-Agitator', 'Intrudium']
        }
    };    

    const rarityColors = {
        "Rare": "#5c7dff",       
        "Very Rare": "#8800ff",    
        "Import": "#ff0000",       
        "Exotic": "#ffe600",      
        "Black Market": "#d300e2"  
    };
    

    const getRandomItem = (crate, rarity) => {
        const items = crateItems[crate][rarity];
        return items[Math.floor(Math.random() * items.length)]; // Random item from rarity
    };
    
    const getRandomRarity = () => {
        const randomNum = Math.random() * 100;
        let cumulativeChance = 0;
    
        for (const { rarity, chance } of rarityOdds) {
            cumulativeChance += chance;
            if (randomNum <= cumulativeChance) {
                return rarity;
            }
        }
        return rarityOdds[0].rarity;
    };

    const openCrates = async (count) => {
        const crate = selectedCrate;
        const newResults = [];
        const username = localStorage.getItem('username') || "Guest"; // Ensure username is set, else add guest
    
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
        // Find the player's entry in the leaderboard
        let playerIndex = leaderboard.findIndex(entry => entry.username === username);
    
        // Create a new entry if user doesn't exist
        if (playerIndex === -1) {
            leaderboard.push({
                username,
                totalCrates: 0,
                Rare: 0,
                'Very Rare': 0,
                Import: 0,
                Exotic: 0,
                'Black Market': 0
            });
            playerIndex = leaderboard.length - 1; // Update index
        }
    
        for (let i = 0; i < count; i++) {
            if (crateMode === "multiple") {
                await new Promise(resolve => setTimeout(resolve, 50)); // Delay on opening multiple
            }
    
            const rarity = getRandomRarity();
            const item = getRandomItem(crate, rarity);
            const result = rarity + " - " + item;
    
            newResults.push(result);
            setSessionResults(prev => [...prev, result]);
            setRecentResults(prev => [result, ...prev].slice(0, 5));
    
            // Update the player's stats in the leaderboard
            leaderboard[playerIndex].totalCrates += 1;
            leaderboard[playerIndex][rarity] += 1;
        }
    
        // Save the updated leaderboard to localStorage
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    };
    
    const handleCrateModeChange = (event) => {
        setCrateMode(event.target.value);
        if (event.target.value === "single") {
            setCrateCount(1); // Reset crate count when switching back to single
        }
    };

    const handleCrateChange = (event) => {
        setSelectedCrate(event.target.value);
    };

    return (
        <div className="info">
            <h2>Open Crates</h2>

            <div className="grid-container">
                <section className="crate-selection">
                    <fieldset className="crate-mode-selector">
                        <label htmlFor="single">Single Crate</label>
                        <input 
                            type="radio" 
                            id="single" 
                            name="crateMode" 
                            value="single" 
                            checked={crateMode === "single"} 
                            onChange={handleCrateModeChange} 
                        />
                        <label htmlFor="multiple">Multiple Crates</label>
                        <input 
                            type="radio" 
                            id="multiple" 
                            name="crateMode" 
                            value="multiple" 
                            checked={crateMode === "multiple"} 
                            onChange={handleCrateModeChange} 
                        />            
                    </fieldset>

                    {/* This part ensures the slider appears only when "Multiple" is selected */}
                    <div className="crate-slider" style={{ display: crateMode === "multiple" ? "block" : "none" }}>
                        <label htmlFor="range">Crates:</label>
                        <input 
                            type="range" 
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
                        <select id="select" name="varSelect" value={selectedCrate} onChange={handleCrateChange}>
                            <option value="Accelerator">Accelerator</option>
                            <option value="Impact">Impact</option>
                            <option value="Turbo">Turbo</option>
                            <option value="Vindicator">Vindicator</option>
                        </select>

                        <div id="crate-image" className="picture-box">
                        <img 
                            src={`${selectedCrate.replace(' Crate', '').toLowerCase()}.jpg`} 
                            alt={selectedCrate} 
                        />
                        </div>
                        <button
                            type="button"
                            className="btn btn-success mt-1"
                            onClick={() => openCrates(crateCount)}
                        >
                            Open
                        </button>
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
                                <td>{sessionResults.length}</td>
                                <td>{sessionResults.filter(r => r.startsWith('Rare')).length}</td>
                                <td>{sessionResults.filter(r => r.startsWith('Very Rare')).length}</td>
                                <td>{sessionResults.filter(r => r.startsWith('Import')).length}</td>
                                <td>{sessionResults.filter(r => r.startsWith('Exotic')).length}</td>
                                <td>{sessionResults.filter(r => r.startsWith('Black Market')).length}</td>
                            </tr>
                        </tbody>

                    </table>
                </section>

                <section className="recent-openings">
                <fieldset>
                    <legend className="recent">Recent Crate Openings</legend>
                    {recentResults.map((result, i) => {
                        const rarity = result.split(" - ")[0];
                        return (
                            <p key={i} style={{ color: rarityColors[rarity] }}>
                                You opened ({result})
                            </p>
                        );
                    })}
                </fieldset>
                </section>

                <section className="just-opened">
                    <p 
                        className="opened" 
                        style={{ color: recentResults.length > 0 ? rarityColors[recentResults[0].split(" - ")[0]] : "black" }}
                    >
                        {recentResults.length > 0 ? recentResults[0] : 'Open a crate!'}
                    </p>
                </section>


            </div>
        </div>
    );
}
