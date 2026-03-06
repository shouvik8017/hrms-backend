import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const dbconnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected successfully, connection: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};
