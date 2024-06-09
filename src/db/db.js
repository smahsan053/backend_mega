import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // mongoose.connect - returns an object
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    /*
    // try logging connectionInstance once & see what this
    console.log(connectionInstance);
    */
    // to check whether I'm connected to right host or not
    console.log(
      `\n MONGODB connected !! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connecton FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
