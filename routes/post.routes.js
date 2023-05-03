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
  Post.find()
  //  .populate("posts")
    .then((allPosts) => {
      console.log('allPosts', allPosts)
      res.json(allPosts)})
    .catch((err) => res.json(err));
}); 

//  GET /api/posts/:postId -  Retrieves a specific post by id
router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
 // Each Post document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Post.findById(postId)
    .then((post) => res.status(200).json(post))
    .catch((error) => res.json(error)); 
})
module.exports = router