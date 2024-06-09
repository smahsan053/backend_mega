// Define a class to standardize API responses across your application.
class ApiResponse {
  // Constructor to initialize the response properties.
  constructor(
    statusCode, // HTTP status code indicating the result of the request (e.g., 200 for success, 404 for not found).
    data, // The actual data to be sent in the response (can be any type: object, array, etc.).
    message = "Success" // Default message to indicate the status of the response, defaults to "Success".
  ) {
    this.statusCode = statusCode; // Set the HTTP status code.
    this.data = data; // Set the response data.
    this.message = message; // Set the response message.
    this.success = statusCode < 400; // Determine success based on the status code (true for codes below 400).
  }
}

// Usage example:
// const response = new ApiResponse(200, { user: "John Doe" }, "User data retrieved successfully.");
// console.log(response);

export { ApiResponse }; // Export the class for use in other modules.
