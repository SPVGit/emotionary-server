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
        "hurt",
        "embarrassed",
        "depressed",
      ],
      required: true,
    },
    title: String,
    description: String,
    // tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    // owner will be added later on
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
