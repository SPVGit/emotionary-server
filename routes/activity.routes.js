const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Activity = require("../models/Activity.model"); 

// POST /addactivity - Adds new activity to Post
router.post("/addactivity/:postId", (req, res, next) => {
    const { postId } = req.params;
    const {title, level, time, successRating, notes} = req.body;
    

    Activity.create({title, level, time, successRating, notes, post: postId})
    .then((newActivity) => {
        
        return Post.findByIdAndUpdate(postId, {
            $push: { activities: newActivity._id },
        });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
})

module.exports = router;