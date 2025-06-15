import prisma from '../lib/prismaClient.js'; // Make sure this matches the actual path to your prismaClient.js

// In your backend, inside ambulanceController.js
export const updateLocation = async (req, res) => {
  const { latitude, longitude, status } = req.body; // Get latitude, longitude, and status from request body

  // Log incoming data to confirm it's being received correctly
  console.log('🔍 Received data to update location:', { latitude, longitude, status });

  // Add additional validation to confirm all data is present
  if (!latitude || !longitude || !status) {
    console.error('❌ Missing required fields: latitude, longitude, or status.');
    return res.status(400).json({ error: 'Latitude, longitude, and status are required.' });
  }

  try {
    // Create a new ambulance record with the provided latitude, longitude, and status
    console.log('🔥 Attempting to create new ambulance with data:', { latitude, longitude, status });

    const ambulance = await prisma.ambulance.create({
      data: {
        latitude,  // Latitude from the request body
        longitude, // Longitude from the request body
        status,    // Status from the request body
      },
    });

    console.log('✅ Location successfully updated:', ambulance);
    res.status(200).json(ambulance); // Return the created ambulance object as a response
  } catch (error) {
    console.error('❌ Error updating location:', error); // Log the error for debugging
    console.error('Stack trace:', error.stack); // Capture stack trace for more context
    res.status(500).json({ error: 'Error updating location', message: error.message }); // Return an error response with the message
  }
};

// Get all ambulances' locations
export const getAllAmbulances = async (req, res) => {
  console.log('🔍 Fetching all ambulances...');

  try {
    const ambulances = await prisma.ambulance.findMany();
    console.log('✅ Fetched ambulances:', ambulances); // Log the fetched ambulances
    res.status(200).json(ambulances);
  } catch (error) {
    console.error('❌ Error fetching ambulances:', error);
    console.error('Stack trace:', error.stack); // Capture stack trace for more context
    res.status(500).json({ error: 'Error fetching ambulances', message: error.message });
  }
};
