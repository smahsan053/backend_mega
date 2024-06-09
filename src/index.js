// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });

/*
// 1st approach
// not a good approach - polluted index.js
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express()(
  // start semicolon for cleaning purpose
  async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      // below will listen any error on express
      app.on("error", (error) => {
        console.log("ERROR:", error);
        throw error;
      });
      // if sucessful
      app.listen(process.env.PORT, () => {
        console.log(`App is listening on ${process.env.PORT}`);
      });
    } catch (error) {
      console.error("ERROR", error);
      throw err;
    }
  }
)();
*/
