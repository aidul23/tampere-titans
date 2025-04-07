const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Achievement", achievementSchema)