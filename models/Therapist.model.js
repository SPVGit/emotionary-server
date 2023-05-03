const mongoose = require("mongoose")
const { Schema, model } = mongoose

const therapistSchema = new Schema(
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
    users: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Therapist = model("Therapist", therapistSchema)

module.exports = Therapist
