const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Post = require("../models/Post.model");


//  POST /api/posts  -  Creates a new post
router.post("/addpost", (req, res, next) => {
  const { emotion, date, rating, description, userId } = req.body;

  console.log(req.body);

  Post.create({ emotion, date, rating, description, user: userId })
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
    //  console.log("allPosts", allPosts);
      res.json(allPosts);
    })
    .catch((err) => res.json(err));
});

router.get('/postsbydate/:postId',(req,res,next)=>{
  const {postId}=req.params
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  // Each Post document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Post.findById(postId)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => res.json(error));
})

//  GET /api/posts/:postId -  Retrieves a specific post by id
router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  // Each Post document has `activities` array holding `_id`s of Activity documents
  // We use .populate() method to get swap the `_id`s for the actual Activity documents
  Post.findById(postId)
    .populate("activities")
    .then((post) => {
      res.status(200).json(post)
      console.log("populated post with activities", post)
    })
    .catch((error) => res.json(error));
})

// PUT Update Post
router.put("/posts/edit/:postId", (req, res, next) => {
  const { postId } = req.params

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Post.findByIdAndUpdate(postId, req.body, { new: true })
    .then((updatedPost) => res.json(updatedPost))
    .catch((error) => res.json(error))
})

//DELETE Delete post

router.delete("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(`${postId}`)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  let userId = Post.user
  console.log("userId", userId)
  Post.findByIdAndRemove(postId)
    .then(() => {
      return User.updateMany({}, { $pull: { posts: postId } })
        .then(() => {
          res.json({
            message: `Post with ${postId} is removed from User posts array and from Post collection successfully.`,
          })
        })
        .catch((error) => {
          res.json(error);
        });
    })
    .catch((error) => res.json(error));
});

router.get("/stats", (req, res, next) => {
 
  Post.find()
    .then((post) => {
      res.status(200).json(post)
      console.log('post', post)
    })
    .catch((error) => res.json(error));
 
}) 


module.exports = router;