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

router.get("/posts/:postId/:activityId", (req, res, next) => {
    const { postId, activityId } = req.params;
    console.log("postId from get activity", postId)
    console.log("activityId from get activity", activityId)
  
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Activity.findById(activityId)
        .populate("post")
        .then((activity) => {
            res.status(200).json(activity)
            console.log("activity populated with post", activity)
        })
        .catch((error) => res.json(error))
})

router.delete("/posts/:postId/:activityId", (req, res, next) => {
    const { postId, activityId } = req.params;
    console.log("postId from activity delete", postId)
    console.log("activityId from activity delete", activityId)
  
    if (!mongoose.Types.ObjectId.isValid(`${activityId}`)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
 /*   let userId = Post.user
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
      .catch((error) => res.json(error)); */
  });

module.exports = router;