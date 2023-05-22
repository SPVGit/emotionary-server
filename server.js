// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
require("dotenv").config()
const PORT = process.env.PORT || 5005

const express = require("express")
const app = require("./app")

const cors = require("cors")

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let myServer = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

//-----------------SCOKET.IO SETUP-------------------------------
const { Server } = require("socket.io")
const io = new Server(myServer, {
  cors: {
    // withCredentials: true,
    origin: process.env.ORIGIN,
  },
})

//---------------------------------------------------------------

//-------------------SOCKET EVENTS -----------------------------

const MessageModel = require("./models/Message.model")

io.on("connection", (socket) => {
  console.log("a user connected")
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  socket.on("join_chat", (data) => {
    socket.join(data)
    console.log("User Joined Room: " + data)
  })

  socket.on("send_message", (data) => {
    const { sender, message, senderName, uniqueId, chatId } = data

    let newMessage = {
      conversationId: chatId,
      sender: sender._id,
      message: message,
      uniqueId: uniqueId,
      senderName: senderName,
    }

    // As the conversation happens, keep saving the messages in the DB
    MessageModel.create(newMessage).then(async () => {
      //Find all messages and send it back
      let allMessages = await MessageModel.find({ conversationId: chatId }).populate("sender")
      socket.to(data.chatId).emit("receive_message", allMessages)
    })
  })
})
