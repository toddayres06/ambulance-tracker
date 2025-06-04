import prisma from '../lib/prismaClient.js'; // Prisma client to interact with your database

// Controller function to get ambulance data
export const getAmbulances = async (req, res) => {
  console.log('Received request for ambulances');  // Log when the request is received
  try {
    // Fetch ambulances from the database
    const ambulances = await prisma.ambulance.findMany();
    console.log('Ambulances fetched:', ambulances);  // Log fetched data
    res.json(ambulances);  // Send the data as JSON response
  } catch (error) {
    console.error('Error fetching ambulances:', error);
    res.status(500).json({ error: 'Error fetching ambulances' });
  }
};
