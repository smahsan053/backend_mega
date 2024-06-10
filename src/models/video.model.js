import mongoose, { Schema } from "mongoose";
// Importing Mongoose and Schema for defining the video schema

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// Importing the mongoose-aggregate-paginate-v2 plugin for adding pagination functionality to Mongoose aggregation

// Define the schema for a video document
const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // URL to the video file, typically hosted on a service like Cloudinary
      required: true, // This field is required, meaning each video document must have a video file URL
    },
    thumbnail: {
      type: String, // URL to the thumbnail image of the video, typically hosted on a service like Cloudinary
      required: true, // This field is required, meaning each video document must have a thumbnail image URL
    },
    title: {
      type: String, // The title of the video
      required: true, // This field is required, meaning each video document must have a title
    },
    description: {
      type: String, // A description of the video
      required: true, // This field is required, meaning each video document must have a description
    },
    duration: {
      type: Number, // Duration of the video in seconds
      required: true, // This field is required, meaning each video document must have a duration
    },
    views: {
      type: Number, // Count of views the video has received
      default: 0, // Default value is 0, meaning videos start with no views
    },
    isPublished: {
      type: Boolean, // Indicates if the video is published and available to viewers
      default: true, // Default value is true, meaning videos are published by default
    },
    owner: {
      type: Schema.Types.ObjectId, // Reference to the user who owns the video
      ref: "User", // This ObjectId refers to the User model, creating a relationship between the video and the user
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps to the document
);

// Apply the mongooseAggregatePaginate plugin to the video schema
// Purpose: This adds pagination capabilities to the video schema, enabling efficient pagination of large datasets in aggregation queries
videoSchema.plugin(mongooseAggregatePaginate);

// Create the Video model from the schema
// Purpose: The model represents the video documents in the MongoDB collection and provides methods to interact with the data
export const Video = mongoose.model("Video", videoSchema);
