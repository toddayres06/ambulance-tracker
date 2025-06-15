import prisma from '../lib/prismaClient.js'; // Make sure this matches the actual path to your prismaClient.js

export const updateLocation = async (req, res) => {
  const { latitude, longitude, status, driverId } = req.body; // Get latitude, longitude, status, and driverId from the request body

  // Log incoming data to confirm it's being received correctly
  console.log('🔍 Received data to update location:', { latitude, longitude, status, driverId });

  // Add additional validation to confirm all data is present
  if (!latitude || !longitude || !status || !driverId) {
    console.error('❌ Missing required fields: latitude, longitude, status, or driverId.');
    return res.status(400).json({ error: 'Latitude, longitude, status, and driverId are required.' });
  }

  try {
    // Create or update ambulance record with the provided latitude, longitude, status, and driverId
    console.log('🔥 Attempting to create new ambulance with data:', { latitude, longitude, status, driverId });

    const ambulance = await prisma.ambulance.create({
      data: {
        latitude,  // Latitude from the request body
        longitude, // Longitude from the request body
        status,    // Status from the request body
        driver: {  // Create or connect driver based on driverId
          connect: { id: driverId },  // Connect to the user with the provided driverId
        },
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
