import prisma from '../lib/prismaClient.js';  // Prisma client to interact with your database

// Controller function to get ambulance data
export const getAmbulances = async (req, res) => {
  try {
    // Fetch ambulances from the database (or mock data)
    const ambulances = await prisma.ambulance.findMany();  // Make sure your DB model is correct
    res.json(ambulances);
  } catch (error) {
    console.error('Error fetching ambulances:', error);
    res.status(500).json({ error: 'Error fetching ambulances' });
  }
};
