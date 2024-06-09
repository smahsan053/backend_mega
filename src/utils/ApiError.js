// Importing the Error class to extend it and create custom error handling.
class ApiError extends Error {
  // Constructor to initialize the custom error.
  // Accepts a status code, a message, an array of errors, and an optional stack trace.
  constructor(
    statusCode, // HTTP status code for the error (e.g., 404, 500).
    message = "Something went wrong", // Default error message if not provided.
    errors = [], // Array to hold multiple error details, defaults to an empty array.
    stack = "" // Optional stack trace string for debugging purposes.
  ) {
    super(message); // Call the parent class (Error) constructor with the message.
    
    this.statusCode = statusCode; // Set the HTTP status code.
    this.data = null; // Placeholder for any additional data (not used here, defaults to null).
    this.message = message; // The error message.
    this.success = false; // Boolean flag to indicate success status (false in this case since it's an error).
    this.errors = errors; // Array containing detailed error messages or objects.

    if (stack) {
      // If a stack trace is provided, use it.
      this.stack = stack;
    } else {
      // Otherwise, capture the stack trace for the current error instance.
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Exporting the ApiError class for use in other parts of the application.
export { ApiError };
