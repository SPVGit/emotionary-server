const router = require("express").Router()
const Conversation = require("../models/Conversation.model")
const Message = require("../models/Message.model")

// A route to return the converstaion id between two participants if it already exists
// or create a new converstaion, when users chat for the first time. Their ids will be saved in the database under a specific chat ID.

router.post("/conversation", (req, res, next) => {

  //The user will send an array of participant ids in the chat (usually just two)

  const { participants } = req.body
  Conversation.findOne({ participants: { $all: participants } })
    .then((found) => {
      if (found) {
        //Conversation between the participants already present
        res.status(200).json(found)
      } else {
        //Create a conversation between them if they are chatting for the first time
        Conversation.create({ participants }).then((response) => {
          res.status(200).json(response)
        })
      }
    })
    .catch((err) => {
      next(err)
    })
})

// A route to get all messages of a certain converstaion to display on chat box
router.get("/messages/:conversationId", (req, res, next) => {
  const { conversationId } = req.params
  Message.find({ conversationId })
    .populate("sender")
    .then((messages) => {
      res.status(200).json(messages)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
