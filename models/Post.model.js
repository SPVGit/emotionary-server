const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    emotion: {
      type: String,
      enum: [
        "happy",
        "in-love",
        "excited",
        "satisfied",
        "calm",
        "sad",
        "anxious",
        "angry",
        "embarrassed",
        "depressed",
      ],
      required: true,
    },
    description: String,
    user: {type: Schema.Types.ObjectId, ref: "User"},
    rating: {
      type: String,
      enum: ["1", "2", "3", "4", "5"], 
    },
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity"}] 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
