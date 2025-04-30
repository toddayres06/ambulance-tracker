const cors = require('cors');
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes'); // 👈 new import

const { authenticateToken } = require('./middleware/authMiddleware');
const { authorizeRole } = require('./middleware/roleMiddleware');

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // 👈 new route

// 🔥 Mock fleet of ambulances
let ambulances = [
  {
    id: 'Ambulance-1',
    latitude: 29.7604,
    longitude: -95.3698,
    "status": "Clear"
  },
  {
    id: 'Ambulance-2',
    latitude: 29.7704,
    longitude: -95.3598,
    "status": "Clear"
  },
  {
    id: 'Ambulance-3',
    latitude: 29.7504,
    longitude: -95.3798,
    "status": "Clear"
  },
  {
    id: 'Ambulance-4',
    latitude: 29.7554,
    longitude: -95.3658,
    "status": "Clear"
  },
  {
    id: 'Ambulance-5',
    latitude: 29.7654,
    longitude: -95.3758,
    "status": "Clear"
  }
];

// 🔄 Update ambulance positions slightly every 5 seconds
setInterval(() => {
  ambulances.forEach(ambulance => {
    ambulance.latitude += (Math.random() - 0.5) * 0.001;
    ambulance.longitude += (Math.random() - 0.5) * 0.001;
  });
}, 5000);

// 📡 GET endpoint to return all ambulances
app.get('/api/ambulances', (req, res) => {
  res.json(ambulances);
});

app.patch('/api/ambulances/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const ambulance = ambulances.find(a => a.id === id);

  if (ambulance) {
    ambulance.status = status;
    res.json({ message: 'Status updated successfully.' });
  } else {
    res.status(404).json({ message: 'Ambulance not found.' });
  }
});

// ✅ Protected route example
app.get('/api/admin-data', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin! Here is your secret data.' });
});

// ✅ Another example for dispatchers
app.get('/api/dispatcher-data', authenticateToken, authorizeRole('dispatcher'), (req, res) => {
  res.json({ message: 'Welcome Dispatcher! Here is your schedule.' });
});

// 🖥️ Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
