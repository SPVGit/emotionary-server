// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5006
const express = require("express")
const app = require("./app")

const cors = require("cors")
const { createServer } = require("http")
const { Server } = require("socket.io")

// // CHAT
// const server = createServer(app)

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// })

// const MessageModel = require("./models/Message.model")

// io.on("connection", (socket) => {
//   console.log("a user connected")
//   socket.on("disconnect", () => {
//     console.log("user disconnected")
//   })

//   socket.on("join_chat", (data) => {
//     socket.join(data)
//     console.log("User Joined Room: " + data)
//   })

//   socket.on("send_message", (data) => {
//     const {
//       content: { sender, message },
//       chatId,
//     } = data
//     let newMessage = {
//       sender: sender._id,
//       message: message,
//       conversationId: chatId,
//     }
//     // As the conversation happens, keep saving the messages in the DB
//     MessageModel.create(newMessage).then(async () => {
//       //Find all messages and send it back
//       let allMessages = await MessageModel.find({ conversationId: chatId }).populate("sender")
//       socket.to(data.chatId).emit("receive_message", allMessages)
//     })
//   })
// })

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
