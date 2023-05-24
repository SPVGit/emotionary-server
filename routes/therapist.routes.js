const express = require("express")
const router = express.Router()
const User = require("../models/User.model")

router.get("/users", (req, res, next) => { //finds all users and sends them to the therapists dashboard

    User.find()   
      .then((allUsers) => {
        res.json(allUsers);
      })
      .catch((err) => res.json(err));
  });


module.exports = router
