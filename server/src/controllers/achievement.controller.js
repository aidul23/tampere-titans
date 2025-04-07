const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const Achievement = require("../models/achievement.model");

const postAchievement = asyncHandler(async (req, res) => {
  // Destructure the required fields from the request body
  const { title, description } = req.body;

  console.log(title, description);
  

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  // Create a new player in the database
  const achievement = await Achievement.create({
    title,
    description,
  });

  // Check if player is created successfully
  if (!achievement) {
    throw new ApiError(500, "Something went wrong while creating the achievement");
  }

  // Return the response
  return res.status(201).json(new ApiResponse(200, achievement, "Achievement Posted!"));
});

const getAllAchievements = asyncHandler(async (req, res) => {
  try {
    const achievements = await Achievement.find(); // Fetch all activities
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching achievements", error });
  }
});

// Delete an activity
const deleteAchievement = asyncHandler(async (req, res) => {
  const { achievementId } = req.params;

  // Find the activity by ID and delete it
  const achievement = await Achievement.findByIdAndDelete(achievementId); // You can also use Activity.deleteOne({ _id: activityId })

  if (!achievement) {
    throw new ApiError(404, "Achievement not found");
  }

  res.status(200).json({
    success: true,
    message: "Achievement deleted successfully",
  });
});

// Edit an activity
const editAchievement = asyncHandler(async (req, res) => {
  const { achievementId } = req.params;
  const { title, description } = req.body;

  // Check if the activity exists
  const achievement = await Achievement.findById(achievementId);
  if (!achievement) {
    throw new ApiError(404, "Achievement not found");
  }


  achievement.title = title || achievement.title;
  achievement.description = description || achievement.description;

  // Save the updated activity
  await achievement.save();

  return res.status(200).json(new ApiResponse(200, achievement, "Achievement updated successfully"));
});

module.exports = { postAchievement, getAllAchievements, deleteAchievement, editAchievement }