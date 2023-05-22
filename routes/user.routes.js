const express = require("express")
const router = express.Router()
const User = require("../models/User.model")
const Therapist = require("../models/Therapist.model")

//  GET /User -  Retrieves user
router.get("/profile/:userId", (req, res, next) => {
  const { userId } = req.params
  console.log("monkey")
  console.log("profile params", req.params)
  User.findById(userId)
    //  .populate("posts")
    .then((user) => {
      console.log("user", user)
      res.json(user)
    })
    .catch((err) => res.json(err))
})



router.get("/therapist", (req, res, next) => {
  console.log("monkey")
  Therapist.find()
    //  .populate("posts")

    .then((therapist) => {
      console.log("allUsers", therapist)
      res.json(therapist)
    })
    .catch((err) => res.json(err))
})

module.exports = router
