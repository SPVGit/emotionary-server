const { Schema, model } = require("mongoose")
require("./User.model")
require("./Conversation.model")

// 1. Define your schema
let MessageSchema = new Schema(
  {
    uniqueId: String,
    senderName: String,
    sender: {
      
      type: Schema.Types.ObjectId,
    },
    message: String,
    conversationId: {
      ref: "conversation",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
)

// 2. Define your model
let MessageModel = model("message", MessageSchema)

// 3. Export your Model with 'module.exports'
module.exports = MessageModel
