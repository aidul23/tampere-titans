const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  registrationDeadline: { type: Date, default: null},
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true }, // URL to banner image
  registeredTeams: [
    {
      teamName: String,
      city: String,
      logo: String,
      managerEmail: String,
      managerPhone: String,
      transactionId: String,
      hasPaid: Boolean,
      isApproved: { type: Boolean, default: false},
      registeredAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);