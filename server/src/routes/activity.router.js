const { Router } = require("express");
const { upload } = require("../middlewares/multer.middleware");
const {postActivity, getAllActivities} = require("../controllers/activity.controller");

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

module.exports = router