// Import necessary modules
import bcrypt from 'bcryptjs';
// Import the shared Prisma instance
import prisma from '../lib/prismaClient.js';

// Admin sets a password for an EMT
export const setUserPassword = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: 'User ID and password are required.' });
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user password in the database
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { password: hashedPassword },
    });

    // Remove the password from the returned user object for security reasons
    const { password: _, ...userWithoutPassword } = updatedUser;

    // Return the updated user object (without the password)
    res.status(200).json({
      message: 'Password set successfully.',
      user: userWithoutPassword,  // Return the full user object excluding the password
    });
  } catch (error) {
    console.error('Error setting user password:', error);
    res.status(500).json({ error: 'Failed to set password.' });
  }
};
