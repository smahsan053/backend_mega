// asyncHandler function: A utility to handle async route handlers
const asyncHandler = (requestHandler) => {
  // Return a new function that wraps the provided request handler
  (req, res, next) => {
    // Use Promise.resolve to handle the request handler and catch errors
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler }; // Export the asyncHandler for use in other modules

// Alternative code
/*
  // Higher-order function: Takes a function as a parameter and returns a new function
  const asyncHandler = (fn) => {
    // Returns an empty function (Placeholder for further implementation)
    () => {};
  };
*/

/*
// Wrapper code explanation:
// The asyncHandler function is a wrapper for handling asynchronous route handlers in Express.
// It ensures that any error thrown during the async operations is caught and passed to the next middleware.
  
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    // Await the provided function (async route handler)
    await fn(req, res, next);
  } catch (error) {
    // Handle errors and send a response with the error message
    res.status(err.code || 500).json({
      success: false, // Indicate the failure of the operation
      message: err.message, // Send the error message to the client
    });
  }
};
*/

// Example usage in an Express route:
/*
import express from 'express';
import { asyncHandler } from './path/to/asyncHandler';
const app = express();

app.get('/example', asyncHandler(async (req, res) => {
  // Simulate an async operation
  const data = await someAsyncOperation();
  res.send(data);
}));
*/

