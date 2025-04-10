const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    dob: {
      type: String,
      required: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    jerseyNum: {
      type: Number,
      default: 0,
    },
    isCaptain: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },

    // ✅ New: Player Statistics
    stats: {
      goals: {
        type: Number,
        default: 0,
      },
      assists: {
        type: Number,
        default: 0,
      },
      matchesPlayed: {
        type: Number,
        default: 0,
      },
    },

    // ✅ New: Player Achievements
    achievements: [
      {
        title: { type: String, required: true },
        tournament: { type: String },
        description: { type: String },
        date: { type: Date },
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
