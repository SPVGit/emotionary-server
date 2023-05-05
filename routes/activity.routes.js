const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Activity = require("../models/Activity.model"); 

// POST /addactivity - Adds new activity to Post
router.post("/addactivity", (req, res, next) => {
    const {} = req.body;

    Activity.create({})
    .then((newActivity) => {
        return Post.findByIdAndUpdate(userId, {
            $push: { activities: newActivity._id },
        });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
})

module.exports = router;