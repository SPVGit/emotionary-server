const express = require("express")
const router = express.Router()
const User = require("../models/User.model")

router.get("/users", (req, res, next) => {
    console.log('monkey')
    User.find()   
      .then((allUsers) => {
        console.log("allUsers", allUsers);
        res.json(allUsers);
      })
      .catch((err) => res.json(err));
  });


module.exports = router
