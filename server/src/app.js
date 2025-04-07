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

const ADMIN_CREDENTIALS = {
  email: "titans@admin.com",
  password: "123456",
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      res.status(200).json({ message: "Login successful" });
  } else {
      res.status(401).json({ error: "Invalid credentials" });
  }
});

const playerRouter = require("./routes/player.router");
const activityRouter = require("./routes/activity.router");
const achievementRouter = require("./routes/achievement.router");

app.use("/api/v1/players", playerRouter);
app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/achievement", achievementRouter);

module.exports = { app };