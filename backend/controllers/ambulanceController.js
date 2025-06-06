import prisma from '../lib/prismaClient.js'; // Make sure this matches the actual path to your prismaClient.js

// In your backend, inside ambulanceController.js
export const updateLocation = async (req, res) => {
  const { latitude, longitude, status } = req.body; // Get latitude and longitude from request body

  try {
    // Create a new ambulance record with the provided latitude and longitude
    const ambulance = await prisma.ambulance.create({
      data: {
        latitude,  // Latitude from the request body
        longitude, // Longitude from the request body
        status,
      },
    });

    res.status(200).json(ambulance); // Return the created ambulance object as a response
  } catch (error) {
    console.error('Error updating location:', error); // Log the error for debugging
    res.status(500).json({ error: 'Error updating location' }); // Return an error response if something goes wrong
  }
};

// Get all ambulances' locations
export const getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await prisma.ambulance.findMany();
    res.status(200).json(ambulances);
  } catch (error) {
    console.error('Error fetching ambulances:', error);
    res.status(500).json({ error: 'Error fetching ambulances' });
  }
};

