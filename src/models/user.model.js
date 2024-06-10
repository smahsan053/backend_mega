import mongoose, { Schema } from "mongoose"; // Importing mongoose and Schema from mongoose package
import { jwt } from "jsonwebtoken"; // Importing jwt from jsonwebtoken package
import bcrypt from "bcrypt"; // Importing bcrypt package for password hashing

// Creating a new mongoose schema for user data
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true, // Username is required
      unique: true, // Username must be unique
      lowercase: true, // Convert username to lowercase
      trim: true, // Remove leading and trailing whitespace from username
      index: true, // Create index on username field for faster searches
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email must be unique
      lowercase: true, // Convert email to lowercase
      trim: true, // Remove leading and trailing whitespace from email
    },
    fullName: {
      type: String,
      required: true, // Full name is required
      trim: true, // Remove leading and trailing whitespace from full name
      index: true, // Create index on full name field for faster searches
    },
    avatar: {
      type: String, // Cloudinary URL for user avatar
      required: true, // Avatar is required
    },
    coverImage: {
      type: String, // Cloudinary URL for user cover image
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId, // Array of ObjectIds referencing Video documents
        ref: "Video", // Reference to the Video model
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"], // Password is required with a custom error message
    },
    refreshToken: {
      type: String, // Refresh token for JWT token refresh mechanism
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Pre-save hook to hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
  // Purpose: This code defines a pre-save hook for the user schema. It ensures that before saving a user document to the database, the password field is hashed for security purposes.
  // Functionality:
  // It checks if the password field of the user document has been modified. If not, it skips the hashing process.
  if (!this.isModified("password")) return next(); // If password is not modified, skip hashing

  // If the password field has been modified, it uses the bcrypt library to hash the password asynchronously with a salt factor of 10.
  this.password = await bcrypt.hash(this.password, 10); // Hash the password with bcrypt
  // After hashing, it calls the next() function to proceed with the save operation.
  next();
});

// Method to check if a password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  // Purpose: This method is used to compare an input password with the hashed password stored in the database.
  // Functionality:
  // It uses the bcrypt library to compare the input password with the hashed password asynchronously.
  return await bcrypt.compare(password, this.password); // Compare input password with hashed password
};

// Method to generate an access token for the user
// This token is used for short-term authentication and includes user details
// Purpose:
// 1. Authentication: Confirms the user's identity when making API requests.
// 2. Authorization: Determines the user's permissions and access levels.
// 3. Statelessness: Contains all necessary information without needing server-side session storage.
userSchema.methods.generateAccessToken = function () {
  // Purpose: This method generates an access token for the user, which can be used for authentication and authorization purposes.
  // Functionality:
  // It uses the jwt library to sign a JSON Web Token (JWT) payload containing user information (such as user ID, email, username, and full name).
  // The JWT is signed using the secret key specified in the environment variable ACCESS_TOKEN_SECRET.
  // The token has an expiration time specified in the environment variable ACCESS_TOKEN_EXPIRY.
  return jwt.sign(
    {
      _id: this._id, // User ID for identifying the user
      email: this.email, // Email of the user for verification and communication
      username: this.username, // Username for display or additional checks
      fullName: this.fullName, // Full name for personalized experiences or additional checks
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token to ensure its authenticity and integrity
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Expiration time for the access token (e.g., "1h" for 1 hour)
    }
  );
};

// Method to generate a refresh token for the user
// This token is used for obtaining new access tokens without requiring the user to re-authenticate
// Purpose:
// 1. Long-Term Authentication: Allows the user to stay logged in without frequent re-authentication.
// 2. Token Renewal: Provides a way to obtain new access tokens when the current one expires.
userSchema.methods.generateRefreshToken = function () {
  // Purpose: This method generates a refresh token for the user, which can be used to obtain a new access token after the access token expires.
  // Functionality:
  // It uses the jwt library to sign a JSON Web Token (JWT) payload containing only the user ID.
  // The JWT is signed using the secret key specified in the environment variable REFRESH_TOKEN_SECRET.
  // The token has an expiration time specified in the environment variable REFRESH_TOKEN_EXPIRY.
  return jwt.sign(
    {
      _id: this._id, // User ID for identifying the user
    },
    process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the refresh token
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Expiration time for the refresh token (e.g., "7d" for 7 days)
    }
  );
};

// Creating a User model from the userSchema
export const User = mongoose.model("User", userSchema);
