const { Router } = require("express");
const { upload } = require("../middlewares/multer.middleware");
const {postEvent, getAllEvents, deleteEvent, editEvent, registerTeam, getRegisteredTeams, editRegisteredTeam, deleteRegisteredTeam, getSingleEvent} = require("../controllers/event.controller");

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

router.route("/events/:id").get(getSingleEvent);

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

// register team for finn bangla
router.post(
  "/:eventId/register-team",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  registerTeam
);

router.get("/:eventId/teams", getRegisteredTeams);
router.put("/:eventId/teams/:teamId", editRegisteredTeam);
router.delete("/:eventId/teams/:teamId", deleteRegisteredTeam);

module.exports = router