import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(
      "DEBUG - MONGO_URI ada?:",
      typeof process.env.MONGO_URI,
      process.env.MONGO_URI
        ? process.env.MONGO_URI.slice(0, 15) + "..."
        : "KOSONG",
    );
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
