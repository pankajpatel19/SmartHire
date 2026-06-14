import mongoose from "mongoose";
import { MONGO_URI } from "../utils/env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`Database connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Database error : ${error}`);
    process.exit(1);
  }
};
