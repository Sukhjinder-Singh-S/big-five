import mongoose from "mongoose";
import logger from "../lib/logger";

// Connect to MongoDB function to be exported
const connectDB = async () => {
  try {
    const mongoURI: any = process.env.MONGO_URI;

    console.log(mongoURI);
    

    // Connect to MongoDB
    await mongoose.connect(mongoURI);

   logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.info("Error during initialization the db");
    process.exit(1);
  }
};

export default connectDB;
