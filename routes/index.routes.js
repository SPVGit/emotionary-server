const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/User.model")
const router = express.Router()

// GET INDEX
router.get("/", (req, res, next) => {
  res.json("All good in here")
})




module.exports = router
