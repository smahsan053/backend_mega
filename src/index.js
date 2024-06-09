// Importing the 'dotenv' library to manage environment variables.
// 'dotenv' loads environment variables from a `.env` file into `process.env`.
import dotenv from "dotenv";

// Importing the 'connectDB' function from the './db/db.js' module to establish a database connection.
import connectDB from "./db/db.js";

// Importing the 'app' object from the './app.js' module, which is presumably an Express application instance.
import { app } from "./app.js";

// Initializing 'dotenv' with a configuration object that specifies the path to the environment file.
// This reads the environment variables from the specified `.env` file.
dotenv.config({
  path: "./env", // Path to the environment file.
});

// Calling the 'connectDB' function to connect to the database.
// Using `.then` and `.catch` to handle the asynchronous operation of connecting to the database.
connectDB()
  .then(() => {
    // If the database connection is successful, set up an error handler for the Express app.
    app.on("error", (error) => {
      // Log the error to the console.
      console.log("ERROR:", error);
      // Rethrow the error to handle it further up the call stack if needed.
      throw error;
    });

    // Start the server and listen on the specified port from the environment variable or default to port 8000.
    app.listen(process.env.PORT || 8000, () => {
      // Log a message to the console indicating that the server is running and on which port.
      console.log(`Server is running at : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // If the database connection fails, log an error message to the console.
    console.log("MONGO db connection failed !!!", err);
  });

/*
 * Alternate (not recommended) approach:
 * This approach directly connects to the database within the server setup, which can clutter the 'index.js' file.
 
// Importing 'mongoose' to manage MongoDB connections and data schemas.
import mongoose from "mongoose";
// Importing 'DB_NAME' from './constants', which presumably contains database-related constants.
import { DB_NAME } from "./constants";
// Importing 'express' to create an Express application.
import express from "express";
// Creating an instance of an Express application.
const app = express()(
  // Immediately-invoked async function to set up the server and connect to the database.
  async () => {
    try {
      // Attempting to connect to the MongoDB database using the URI from environment variables and a specified database name.
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      // Setting up an error handler for the Express app.
      app.on("error", (error) => {
        // Log the error to the console.
        console.log("ERROR:", error);
        // Rethrow the error for further handling.
        throw error;
      });
      // Start the server and listen on the specified port from the environment variables.
      app.listen(process.env.PORT, () => {
        // Log a message to the console indicating that the server is running and on which port.
        console.log(`App is listening on ${process.env.PORT}`);
      });
    } catch (error) {
      // If there is an error during the database connection or server setup, log the error to the console.
      console.error("ERROR", error);
      // Rethrow the error for additional handling or logging.
      throw err;
    }
  }
)();
*/
