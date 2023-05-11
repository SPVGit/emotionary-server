const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { isAuthenticated } = require("./../middleware/jwt.middleware.js")
const router = express.Router()
const saltRounds = 10
const mongoose = require("mongoose")
const Therapist = require("../models/Therapist.model")
const { isTherapistAuthenticated } = require("../middleware/jwt.middleware.js")

//Log in route



module.exports = router
