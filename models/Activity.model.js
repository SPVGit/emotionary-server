const mongoose = require("mongoose")
const { Schema, model } = mongoose

const activitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Enter a title"],
    },

    level: {
      type: String,
      enum: ["easy", "moderate", "difficult"],
      required: [true, "Enter difficulty level"],
    },

    successRating: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      required: [true, "Enter satisfaction level"],
    },
    notes: String,
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  {

    timestamps: true,
  }
)

module.exports = model("Activity", activitySchema)
