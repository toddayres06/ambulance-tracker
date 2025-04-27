// node index.js in terminal to start backend

const express = require('express');
const app = express();
const PORT = 3001;

let latestLocation = null; // Store the last known location

app.use(express.json());

// This route receives and stores location data
app.post('/api/location', (req, res) => {
  console.log('Received location:', req.body);
  latestLocation = req.body; // Save the latest location
  res.status(200).send('Location received');
});

// This route serves the most recent location
app.get('/api/latest-location', (req, res) => {
  if (!latestLocation) {
    return res.status(404).json({ error: 'No location data available' });
  }
  res.status(200).json(latestLocation);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
