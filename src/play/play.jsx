import React, { useState, useEffect } from 'react';
import './play.css';

export function Play() {
    console.log('Play component mounted!'); // Debugging log

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
        const username = localStorage.getItem('username') || "Guest"; // Default to "Guest" if no username

        for (let i = 0; i < count; i++) {
            const rarity = getRandomRarity();
            const item = getRandomItem(selectedCrate, rarity);

            const result = { rarity, item };
            const resultString = `${rarity} - ${item}`;
            
            // Update session results and recent results
            setSessionResults(prev => [...prev, resultString]);
            setRecentResults(prev => [resultString, ...prev].slice(0, 5));

            // Send the result to the backend to update the MongoDB leaderboard
            await fetch('/api/update-leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    result: { rarity }  // Assuming you only want to send rarity for now
                }),
            });
        }
    };

    useEffect(() => {
        console.log('Play page: Running useEffect to test backend...'); // Debugging step
        fetch('/api/test')
            .then(res => res.json())
            .then(data => {
                console.log('Play page backend test:', data.message);
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }, []);

    return (
        <div className="info">
            <h2>Open Crates</h2>
            {/* Your existing UI components for crate opening */}
        </div>
    );
}
