// /backend/index.js
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import shiftTypeRoutes from './routes/shiftTypeRoutes.js';
import shiftAssignmentRoutes from './routes/shiftAssignmentRoutes.js'
import contactRoutes from './routes/contactRoutes'
import prisma from './lib/prismaClient.js';
import { authenticateToken } from './middleware/authMiddleware.js';
import { authorizeRole } from './middleware/roleMiddleware.js';
import { seedAdminUser } from './models/User.js';


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/shift-types', shiftTypeRoutes)
app.use('/api/auth', authRoutes); // 👈 auth routes
app.use('/api', contactRoutes)
app.use('/api/shift-assignments', shiftAssignmentRoutes);

// 🔥 Mock fleet of ambulances
let ambulances = [
  { id: 'Ambulance-1', latitude: 29.7604, longitude: -95.3698, status: 'Clear' },
  { id: 'Ambulance-2', latitude: 29.7704, longitude: -95.3598, status: 'Clear' },
  { id: 'Ambulance-3', latitude: 29.7504, longitude: -95.3798, status: 'Clear' },
  { id: 'Ambulance-4', latitude: 29.7554, longitude: -95.3658, status: 'Clear' },
  { id: 'Ambulance-5', latitude: 29.7654, longitude: -95.3758, status: 'Clear' }
];

// 📥 Load all contacts at startup
(async () => {
  const allContacts = await prisma.user.findMany();
  console.log('All contacts:', allContacts);
})();

// 🔄 Simulate ambulance movement
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

// 🛠️ PATCH to update ambulance status
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

// 🔐 Protected routes
app.get('/api/admin-data', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin! Here is your secret data.' });
});

app.get('/api/dispatcher-data', authenticateToken, authorizeRole('dispatcher'), (req, res) => {
  res.json({ message: 'Welcome Dispatcher! Here is your schedule.' });
});

await seedAdminUser();

// 🖥️ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
