import fetch from 'node-fetch';

// Starting point (Houston downtown)
let latitude = 29.7604;
let longitude = -95.3698;

// Function to slightly move the point
const moveSlightly = () => {
  const latChange = (Math.random() - 0.5) * 0.001; // Small random nudge
  const lngChange = (Math.random() - 0.5) * 0.001;

  latitude += latChange;
  longitude += lngChange;
};

const sendLocation = async () => {
  moveSlightly();

  try {
    const res = await fetch('http://localhost:3001/api/location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latitude, longitude }),
    });

    if (!res.ok) throw new Error('Failed to send location');
    console.log(`Location sent: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
  } catch (err) {
    console.error('Error sending location:', err.message);
  }
};

// Send location every 3 seconds
setInterval(sendLocation, 3000);
