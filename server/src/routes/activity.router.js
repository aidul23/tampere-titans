const { Router } = require("express");
const { upload } = require("../middlewares/multer.middleware");
const {postActivity, getAllActivities, deleteActivity, editActivity} = require("../controllers/activity.controller");

const router = Router();

router.route("/post").post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    postActivity
  );
  
router.route("/activities").get(getAllActivities);

// Route to delete an activity by ID
router.route("/activities/:activityId").delete(deleteActivity);

// Route to edit an activity by ID (with optional image upload)
router.route("/activities/:activityId").put(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  editActivity
);

module.exports = router