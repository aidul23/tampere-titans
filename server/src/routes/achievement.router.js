const { Router } = require("express");
const { postAchievement, getAllAchievements, deleteAchievement, editAchievement } = require("../controllers/achievement.controller");

const router = Router();

router.route("/").post(postAchievement);

router.route("/achievements").get(getAllAchievements);

// Route to delete an activity by ID
router.route("/achievements/:achievementId").delete(deleteAchievement);

// Route to edit an activity by ID (with optional image upload)
router.route("/achievements/:achievementId").put(editAchievement);

module.exports = router