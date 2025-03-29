const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const playerRouter = require("./routes/player.router");
const activityRouter = require("./routes/activity.router");

app.use("/api/v1/players", playerRouter);
app.use("/api/v1/activity", activityRouter);

module.exports = { app };