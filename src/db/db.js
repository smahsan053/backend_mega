// Importing the 'mongoose' library to handle MongoDB interactions.
import mongoose from "mongoose";

// Importing the database name from the '../constants.js' module.
// This might contain a constant defining the name of the database to connect to.
import { DB_NAME } from "../constants.js";

// Defining an asynchronous function 'connectDB' to establish a connection to the MongoDB database.
const connectDB = async () => {
  try {
    // Attempting to connect to MongoDB using mongoose. The 'await' keyword pauses the function execution
    // until the connection attempt completes.
    // 'mongoose.connect' returns a connection instance if successful.
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}` // Constructing the connection URI using an environment variable and the database name.
    );

    /*
     * The 'connectionInstance' object contains details about the established connection.
     * Uncomment the following line to log the connection instance and see its details.
     */
    // console.log(connectionInstance);

    // Logging a message to the console to confirm a successful connection and displaying the host.
    // 'connectionInstance.connection.host' gives the host name of the MongoDB server connected to.
    console.log(
      `\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // If there is an error during the connection attempt, log a failure message and the error details.
    console.log("MONGODB connection FAILED", error);

    // Exit the process with a failure code (1). This stops the application if the database connection fails.
    process.exit(1);
  }
};

// Exporting the 'connectDB' function as the default export of this module.
// Other modules can import this function to establish a database connection.
export default connectDB;
