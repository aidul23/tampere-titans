const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const Player = require("../models/player.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const registerPlayer = asyncHandler(async (req, res) => {
  // Destructure the required fields from the request body
  const { name, dob, email, phone, position } = req.body;

  // Validate required fields
  if (!name || !dob || !email || !phone || !position) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if a player already exists with the same email
  const existedPlayer = await Player.findOne({ email });
  if (existedPlayer) {
    throw new ApiError(409, "Player already exists with this email");
  }

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
  const player = await Player.create({
    name,
    dob,
    email,
    phone,
    position,
    image: image.url, // Store image URL
    jerseyNum: 0,
    isApproved: false,
  });

  // Check if player is created successfully
  if (!player) {
    throw new ApiError(500, "Something went wrong while creating the player");
  }

  // Return the response
  return res.status(201).json(new ApiResponse(200, player, "Player registered successfully"));
});

const approvePlayer = asyncHandler(async (req, res) => {
  try {
    // const { jerseyNum } = req.body; // Get jersey number from request
    const playerId = req.params.id;
    

    // if (!jerseyNum || jerseyNum <= 0) {
    //   return res.status(400).json({ message: "Invalid jersey number" });
    // }
    
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { isApproved: true },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player approved", player: updatedPlayer });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

const getAllPlayers = asyncHandler(async (req, res) => {
  try {
    const players = await Player.find(); // Fetch all players
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players", error });
  }
})

const deletePlayer = asyncHandler(async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting player", error });
  }
})

const updatePlayer = asyncHandler(async (req, res) => {
  try {
    const playerId = req.params.id;
    const updatedPlayer = await Player.findByIdAndUpdate(playerId, req.body, { new: true });

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player updated successfully", player: updatedPlayer });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getApprovedPlayers = asyncHandler(async (req, res) => {
  try {
    const approvedPlayers = await Player.find({ isApproved: true }); // Fetch only approved players
    res.status(200).json({ players: approvedPlayers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching approved players", error });
  }
});

module.exports = { registerPlayer, approvePlayer, getAllPlayers, deletePlayer, updatePlayer, getApprovedPlayers }