import express from 'express';
import { updateLocation, getAllAmbulances } from '../controllers/ambulanceController.js';

const router = express.Router();

// Define the route for getting ambulance data
router.post('/location', updateLocation);  // This will call the `updateLocation` function in the controller
router.get('/ambulances', getAllAmbulances);

export default router;
