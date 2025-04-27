const cors = require('cors')
const express = require('express');
const app = express();
const PORT = 3001;

app.use(cors()); 
app.use(express.json()); 

// Mock live location
let currentLat = 29.7604; // Houston
let currentLng = -95.3698;

// Slightly move coordinates every few seconds
setInterval(() => {
  currentLat += (Math.random() - 0.5) * 0.001;
  currentLng += (Math.random() - 0.5) * 0.001;
}, 5000);

// API endpoint to get live location
app.get('/api/location', (req, res) => {
  res.json({
    latitude: currentLat,
    longitude: currentLng,
  });
});

// Store and retrieve latest posted location
let latestLocation = null; 

app.post('/api/location', (req, res) => {
  console.log('Received location:', req.body);
  latestLocation = req.body;
  res.status(200).send('Location received');
});

app.get('/api/latest-location', (req, res) => {
  if (!latestLocation) {
    return res.status(404).json({ error: 'No location data available' });
  }
  res.status(200).json(latestLocation);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
