const { Router } = require("express");
const { upload } = require("../middlewares/multer.middleware");
const {postEvent, getAllEvents, deleteEvent, editEvent} = require("../controllers/event.controller");

const router = Router();

router.route("/").post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    postEvent
  );
  
router.route("/events").get(getAllEvents);

// Route to delete an activity by ID
router.route("/events/:eventId").delete(deleteEvent);

// Route to edit an activity by ID (with optional image upload)
router.route("/events/:eventId").put(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  editEvent
);

module.exports = router