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

router.post("/login", isTherapistAuthenticated, (req, res, next) => {
  // middleware may not work -- this is a test. MOVE TO APP.JS
  const { email, password } = req.body

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." })
    return
  }

  // Check the users collection if a user with the same email exists
  Therapist.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." })
        return
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password)

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser

        // Create an object that will be set as the token payload
        const payload = { _id, email, name }

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: "HS256", expiresIn: "6h" })

        // Send the token as the response
        res.status(200).json({ authToken: authToken })
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" })
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }))
})

router.get("/verify", isAuthenticated, (req, res, next) => {
  // <== CREATE NEW ROUTE

  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload)

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload)
})

module.exports = router
