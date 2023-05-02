const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post.model");


//  POST /api/posts  -  Creates a new post
router.post("/posts", (req, res, next) => {
  const { emotion, title, description } = req.body;

  Post.create({ emotion, title, description })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/posts -  Retrieves all of the posts
/* router.get("/posts", (req, res, next) => {
  Post.find()
   // .populate("tasks")
    .then((allPosts) => res.json(allPosts))
    .catch((err) => res.json(err));
}); */

module.exports = router