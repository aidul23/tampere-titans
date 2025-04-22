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

module.exports = { postEvent, getAllEvents, deleteEvent, editEvent }