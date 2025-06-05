import axios from 'axios'; // Import axios

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
    // Using axios to send the POST request instead of fetch
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/location`, {
      latitude,
      longitude
    });

    // Check if the response was successful
    if (res.status === 200) {
      console.log(`Location sent: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
    } else {
      throw new Error('Failed to send location');
    }
  } catch (err) {
    console.error('Error sending location:', err.message);
  }
};

// Send location every 3 seconds
setInterval(sendLocation, 3000);
