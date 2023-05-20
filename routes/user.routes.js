const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Activity = require("../models/Activity.model")
const fileUploader = require("../config/cloudinary.config")
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

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
/* router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });

  router.post('/image', (req, res, next) => {
    // console.log('body: ', req.body); ==> here we can see that all
    // the fields have the same names as the ones in the model so we can simply pass
    // req.body to the .create() method


   
    User.findByIdAndUpdate(userId)
        .then(user => {
            console.log('user', user)
            res.status(200).json(user)
        })
        .catch(err => next(err))
  }); */

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
