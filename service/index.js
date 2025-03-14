const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.get('/api/test', (req, res) => {
    console.log("Received request at /api/test");
    res.json({ message: "Backend working!" });
  });
  

app.post('/api/open-crate', (req, res) => {
    const rarityOdds = [
        { rarity: 'Rare', chance: 55 },
        { rarity: 'Very Rare', chance: 28 },
        { rarity: 'Import', chance: 12 },
        { rarity: 'Exotic', chance: 4 },
        { rarity: 'Black Market', chance: 1 }
    ];

    const crateItems = {
        'Rare': ['Pearlescent (Matte)', 'Critters', 'Splatter', 'Chainsaw', 'Gigapede'],
        'Very Rare': ['Gaiden', 'Hot Rocks', 'Lightning'],
        'Import': ['Jäger 619', 'Power-Shot', 'Saptarishi', 'Snakeskin'],
        'Exotic': ['Clockwork', 'Chrono'],
        'Black Market': ['Party Time', 'Fireworks', 'Hellfire', 'Popcorn']
    };

    // Select random rarity based on odds
    let randomNum = Math.random() * 100;
    let cumulativeChance = 0;
    let selectedRarity = 'Rare';

    for (const { rarity, chance } of rarityOdds) {
        cumulativeChance += chance;
        if (randomNum <= cumulativeChance) {
            selectedRarity = rarity;
            break;
        }
    }

    // Select random item from that rarity
    const selectedItem = crateItems[selectedRarity][Math.floor(Math.random() * crateItems[selectedRarity].length)];

    console.log(`Backend opened crate: ${selectedRarity} - ${selectedItem}`);

    res.json({ rarity: selectedRarity, item: selectedItem });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
