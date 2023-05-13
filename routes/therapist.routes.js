const express = require("express")
const router = express.Router()
const Therapist = require("../models/Therapist.model")
const User = require("../models/User.model")


router.get("/users", (req, res, next) => {
    console.log('monkey')
    User.find()
      //  .populate("posts")

     
      .then((allUsers) => {
        console.log("allUsers", allUsers);
        res.json(allUsers);
      })
      .catch((err) => res.json(err));
  });


module.exports = router
