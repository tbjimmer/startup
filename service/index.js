const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.get('/api/test', (req, res) => {
  res.json({ message: "Backend working!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
