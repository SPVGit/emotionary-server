const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const activitySchema = new Schema(
  {
    title: {
        type: String,
  /*      enum: [
            "physically-active",
            "avoid-alcohol",
            "quit-smoking",
            "quit-drinking",
            "meditation",
            "yoga",
            "sleeping",
            "healthy-food",
            "socialize",
            "in-the-moment"
        ] */
    },
    chooseActivity: {
      type: String,
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

module.exports = model("Activity", activitySchema);

