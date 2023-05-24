const { Schema, model } = require("mongoose")


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Posts" }],
    therapist: { type: Schema.Types.ObjectId, ref: "Therapist" },
    imageUrl: String,
  },
  {

    timestamps: true,
  }
)

const User = model("User", userSchema)

module.exports = User
