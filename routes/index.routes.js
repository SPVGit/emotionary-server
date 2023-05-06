const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/User.model")
const router = express.Router()

// GET INDEX
router.get("/", (req, res, next) => {
  res.json("All good in here")
})

// GET CHAT Firebase
router.get("/chat", (req, res, next) => {
  res.json("Chat")
})

// GET client
router.get("/client", (req, res, next) => {
  console.log(res)
  User.find()
    .then((allClients) => {
      console.log("allClients", allClients)
      res.json(allClients)
    })
    .catch((err) => res.json(err))
})

module.exports = router
