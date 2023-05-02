const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const activitySchema = new Schema(
  {
    title: {
        type: String,
        enum: [
            "Keep Physically Active",
            "Avoid alcohol and recreational drugs",
            "Quit smoking", 
            "Cut back or quit drinking caffeinated beverages",
            "Do meditation",
            "Do some Yoga",
            "Make sleeping a priority",
            "Eat healthy food",
            "Socialize",
            "Live in the moment as much as you can"
        ]
    },
    level: {
      type: String,
      enum: [
        "easy", 
        "moderate",
        "difficult"
      ],
    },
    time: String,
    successRating: {
        type: String,
        enum: ["1", "2", "3", "4", "5"]
    },
    notes: String,
    post: {type: Schema.Types.ObjectId, ref: "Post"},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);