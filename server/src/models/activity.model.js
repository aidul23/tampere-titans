const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Activity", activitySchema)