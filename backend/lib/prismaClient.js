// backend/lib/prismaClient.js
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load .env from backend folder
dotenv.config();

const prisma = new PrismaClient();
export default prisma;
