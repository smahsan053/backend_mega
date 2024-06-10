// Importing the 'express' framework to create and manage the web server and routes.
import express from "express";

// Importing 'cors' middleware to handle Cross-Origin Resource Sharing (CORS).
// This enables or restricts resources on your web server to be requested from another domain.
import cors from "cors";

// Importing 'cookie-parser' middleware to parse cookies attached to client requests.
// This makes it easier to access cookie values within your server code.
import cookieParser from "cookie-parser";

// Initializing an instance of an Express application. This instance will be used to set up middleware,
// define routes, and start the server.
const app = express();

// Configuring middleware to be used in the Express application.

// Applying the 'cors' middleware.
// The 'cors' function takes an options object to configure CORS settings.
app.use(
  cors({
    // 'origin' specifies which domains are allowed to access resources on your server.
    // 'process.env.CORS_ORIGIN' should be set in your environment variables to the allowed domain(s).
    origin: process.env.CORS_ORIGIN,

    // 'credentials: true' allows the server to accept cookies or authorization headers from the requesting domain.
    credentials: true,
  })
);

// Using the built-in 'express.json' middleware to parse JSON payloads in incoming requests.
// 'limit: "16kb"' restricts the maximum payload size to 16 kilobytes.
app.use(express.json({ limit: "16kb" }));

// Using the built-in 'express.urlencoded' middleware to parse URL-encoded payloads (form data) in incoming requests.
// 'extended: true' allows for parsing of nested objects.
// 'limit: "16kb"' restricts the maximum payload size to 16 kilobytes.
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serving static files from the 'public' directory.
// Any files in the 'public' folder can be accessed by anyone via the URL.
app.use(express.static("public"));

// Using the 'cookie-parser' middleware to parse cookies in incoming requests.
// This adds a 'cookies' property to the request object, making it easier to read cookies.
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
// http://localhost:8000/api/v1/users/register

// Exporting the 'app' instance for use in other modules.
// This allows other parts of your application to use this configured Express app.
export { app };
