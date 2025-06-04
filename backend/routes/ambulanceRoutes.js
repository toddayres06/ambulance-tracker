import express from 'express';
import { getAmbulances } from '../controllers/ambulanceController.js';

const router = express.Router();

// Define the route for getting ambulance data
router.get('/ambulances', getAmbulances);

export default router;
