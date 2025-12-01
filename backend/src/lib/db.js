import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`connected to ${connectionString.connection.host} `);
  } catch (error) {
    console.log("Failed to connect Mongo DB", error);
  }
};
