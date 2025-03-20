const { Router } = require("express");
const { registerPlayer, approvePlayer, getAllPlayers, deletePlayer, updatePlayer, getApprovedPlayers } = require("../controllers/player.controller")
const { upload } = require("../middlewares/multer.middleware");

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  registerPlayer
);

router.route("/").get(getAllPlayers);

router.route("/:id/approve").put(approvePlayer);

router.route("/:id").delete(deletePlayer);

router.route("/:id").put(updatePlayer);

router.route("/approved").get(getApprovedPlayers);

module.exports = router;