const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model")
const Post = require("../models/Post.model");


//  POST /api/posts  -  Creates a new post
router.post("/addpost", (req, res, next) => {
  const { emotion, rating, description, userId } = req.body;

  console.log(req.body);
  
  Post.create({ emotion, rating, description, user:userId})
  .then((newPost) => {
    return User.findByIdAndUpdate(userId, {
      $push: { posts: newPost._id },
    });
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/posts -  Retrieves all of the posts
router.get("/posts", (req, res, next) => {
  User.find()
    .populate("posts")
    .then((allPosts) => res.json(allPosts))
    .catch((err) => res.json(err));
}); 

module.exports = router