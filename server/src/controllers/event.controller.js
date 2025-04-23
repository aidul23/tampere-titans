const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const Event = require("../models/event.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const postEvent = asyncHandler(async (req, res) => {
  // Destructure the required fields from the request body
  const { title, description, date, location } = req.body;
  let { registrationDeadline } = req.body;

  registrationDeadline = registrationDeadline || null;


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
  const event = await Event.create({
    title,
    date,
    registrationDeadline,
    location,
    description,
    image: image.url, // Store image URL
  });

  // Check if player is created successfully
  if (!event) {
    throw new ApiError(500, "Something went wrong while creating the event");
  }

  // Return the response
  return res.status(201).json(new ApiResponse(200, event, "Event Posted!"));
});

const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all activities
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

const editEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { title, description, date, location, registrationDeadline } = req.body;

  // Check if the event exists
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  // Handle image update if a new one is uploaded
  if (req.files?.image) {
    const imageLocalPath = req.files.image[0].path;
    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      throw new ApiError(400, "Image upload failed");
    }
    event.image = image.url;
  }

  // Update fields if provided
  event.title = title || event.title;
  event.description = description || event.description;
  event.date = date || event.date;
  event.location = location || event.location;

  // Handle registrationDeadline (optional)
  event.registrationDeadline =
    registrationDeadline !== undefined
      ? registrationDeadline || null
      : event.registrationDeadline;

  // Save changes
  await event.save();

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event updated successfully"));
});


const deleteEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  // Find the event by ID and delete it
  const event = await Event.findByIdAndDelete(eventId); // You can also use event.deleteOne({ _id: eventId })

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});

const registerTeam = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const {
    teamName,
    city,
    managerEmail,
    managerPhone,
    hasPaid,
    transactionId,
  } = req.body;

  const logoLocalPath = req.files?.logo?.[0]?.path;

  if (!logoLocalPath) {
    throw new ApiError(400, "Team logo is required");
  }

  const logoUpload = await uploadOnCloudinary(logoLocalPath);
  if (!logoUpload) {
    throw new ApiError(500, "Failed to upload logo");
  }

  const teamData = {
    teamName,
    city,
    managerEmail,
    managerPhone,
    hasPaid,
    transactionId,
    logo: logoUpload.url,
  };

  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  event.registeredTeams.push(teamData);
  await event.save();

  return res.status(201).json(
    new ApiResponse(201, teamData, "Team registered successfully!")
  );
});

const getRegisteredTeams = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res.status(200).json(
    new ApiResponse(200, event.registeredTeams, "Registered teams fetched")
  );
});


const editRegisteredTeam = asyncHandler(async (req, res) => {
  const { eventId, teamId } = req.params;
  const {
    teamName,
    city,
    managerEmail,
    managerPhone,
    hasPaid,
    isApproved,
    transactionId,
  } = req.body;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  const team = event.registeredTeams.id(teamId);
  if (!team) {
    throw new ApiError(404, "Team not found");
  }

  // Handle optional logo upload
  if (req.files?.logo) {
    const logoLocalPath = req.files.logo[0].path;
    const uploadedLogo = await uploadOnCloudinary(logoLocalPath);
    if (!uploadedLogo) {
      throw new ApiError(500, "Failed to upload logo");
    }
    team.logo = uploadedLogo.url;
  }

  // Update fields
  team.teamName = teamName || team.teamName;
  team.city = city || team.city;
  team.managerEmail = managerEmail || team.managerEmail;
  team.managerPhone = managerPhone || team.managerPhone;
  team.hasPaid = hasPaid !== undefined ? hasPaid : team.hasPaid;
  team.isApproved = isApproved !== undefined ? isApproved : team.isApproved;
  team.transactionId = transactionId || team.transactionId;

  await event.save();

  return res.status(200).json(
    new ApiResponse(200, team, "Team updated successfully")
  );
});

const deleteRegisteredTeam = asyncHandler(async (req, res) => {
  const { eventId, teamId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  const team = event.registeredTeams.id(teamId);
  if (!team) {
    throw new ApiError(404, "Team not found");
  }

  event.registeredTeams.pull({ _id: teamId }); // Remove the team from the array using pull
  await event.save();

  return res.status(200).json(
    new ApiResponse(200, null, "Team deleted successfully")
  );
});



module.exports = { postEvent, getAllEvents, deleteEvent, editEvent, registerTeam, getRegisteredTeams, editRegisteredTeam, deleteRegisteredTeam }