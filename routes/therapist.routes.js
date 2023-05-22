const express = require("express")
const router = express.Router()
const User = require("../models/User.model")

router.get("/users", (req, res, next) => {

    User.find()   
      .then((allUsers) => {
        res.json(allUsers);
      })
      .catch((err) => res.json(err));
  });


module.exports = router
