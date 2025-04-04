const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const Activity = require("../models/activity.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const postActivity = asyncHandler(async (req, res) => {
  // Destructure the required fields from the request body
  const { title, description } = req.body;


  // Handle image upload (player image/avatar)
  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  // Upload image to Cloudinary
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(400, "Image upload failed");
  }

  // Create a new player in the database
  const activity = await Activity.create({
    title,
    description,
    image: image.url, // Store image URL
  });

  // Check if player is created successfully
  if (!activity) {
    throw new ApiError(500, "Something went wrong while creating the activity");
  }

  // Return the response
  return res.status(201).json(new ApiResponse(200, activity, "Activity Posted!"));
});

const getAllActivities = asyncHandler(async (req, res) => {
  try {
    const activities = await Activity.find(); // Fetch all activities
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error });
  }
});

// Delete an activity
const deleteActivity = asyncHandler(async (req, res) => {
  const { activityId } = req.params;

  // Find the activity by ID and delete it
  const activity = await Activity.findByIdAndDelete(activityId); // You can also use Activity.deleteOne({ _id: activityId })

  if (!activity) {
    throw new ApiError(404, "Activity not found");
  }

  res.status(200).json({
    success: true,
    message: "Activity deleted successfully",
  });
});

// Edit an activity
const editActivity = asyncHandler(async (req, res) => {
  const { activityId } = req.params;
  const { title, description } = req.body;

  // Check if the activity exists
  const activity = await Activity.findById(activityId);
  if (!activity) {
    throw new ApiError(404, "Activity not found");
  }

  // Update the title, description, and possibly the image (if provided)
  if (req.files?.image) {
    const imageLocalPath = req.files.image[0].path;
    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      throw new ApiError(400, "Image upload failed");
    }
    activity.image = image.url;
  }

  activity.title = title || activity.title;
  activity.description = description || activity.description;

  // Save the updated activity
  await activity.save();

  return res.status(200).json(new ApiResponse(200, activity, "Activity updated successfully"));
});

module.exports = { postActivity, getAllActivities, deleteActivity, editActivity }