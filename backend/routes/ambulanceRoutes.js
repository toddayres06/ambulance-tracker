import express from 'express';
import { updateLocation, getAllAmbulances } from '../controllers/ambulanceController.js';

const router = express.Router();

// Define the route for getting ambulance data
router.post('/location', (req, res, next) => {
  console.log('🔍 Request to update ambulance location received');
  next(); // Proceed to the controller
}, updateLocation);

router.get('/ambulances', (req, res, next) => {
  console.log('🔍 Request to get all ambulances received');
  next(); // Proceed to the controller
}, getAllAmbulances);

export default router;
