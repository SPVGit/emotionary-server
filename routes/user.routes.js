const express = require("express")
const router = express.Router()
const User = require("../models/User.model")
const Therapist = require("../models/Therapist.model")


router.get("/therapist", (req, res, next) => {

  Therapist.find()
    .then((therapist) => {
      res.json(therapist)
    })
    .catch((err) => res.json(err))
})

module.exports = router
