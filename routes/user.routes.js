const express = require("express")
const router = express.Router()
const User = require("../models/User.model")
const Therapist = require("../models/Therapist.model")


router.get("/therapist", (req, res, next) => {  //Finds the therapist and sends it to a users chat page

  Therapist.find()
    .then((therapist) => {
      res.json(therapist)
    })
    .catch((err) => res.json(err))
})

module.exports = router
