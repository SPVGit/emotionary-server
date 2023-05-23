const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Post = require("../models/Post.model")
const Activity = require("../models/Activity.model")

//whatever
// POST /addactivity - Adds new activity to Post
router.post("/addactivity/:postId", (req, res, next) => {
  const { postId } = req.params
  const { title, level, time, successRating, notes } = req.body

  Activity.create({ title, level, time, successRating, notes, post: postId })
    .then((newActivity) => {
      return Post.findByIdAndUpdate(postId, {
        $push: { activities: newActivity._id },
      })
    })
    .then((response) => {
      if (response){
        res.json(response)
      }
      else{
        res.json({ message: " please fill up the form" })
      }
    })
    .catch((err) => res.status(400).json({ message: "Please complete all fields" }))
})
//  GET BY POST ID + ACTIVITY ID

router.get("/posts/:postId/:activityId", (req, res, next) => {
  const { postId, activityId } = req.params

  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    res.status(400).json({ message: "Specified id is not valid" })
    return
  }

  Activity.findById(activityId)
    .populate("post")
    .then((activity) => {
      res.status(200).json(activity)

    })
    .catch((error) => res.json(error))
})

//DELETE

router.delete("/posts/:postId/:activityId", (req, res, next) => {
  const { postId, activityId } = req.params

  if (!mongoose.Types.ObjectId.isValid(`${activityId}`)) {
    res.status(400).json({ message: "Specified id is not valid" })
    return
  }

  Activity.findByIdAndRemove(activityId)
    .then(() => {
      return Post.updateMany({}, { $pull: { activities: activityId } })
        .then(() => {
          message: `Activity with ${activityId} is removed`
        })
        .catch((err) => {
          res.json(err)
        })
    })
    .catch((err) => {
      res.json(err)
    })
})

// PUT Update Activity

router.put("/posts/:postId/edit/:activityId", (req, res, next) => {
  const { postId, activityId } = req.params

  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    res.status(400).json({ message: "Specified id is not valid" })
    return
  }

  Activity.findByIdAndUpdate(activityId, req.body, { new: true })
    .then((updatedActivity) => res.json(updatedActivity))
    .catch((error) => res.json(error))
})

module.exports = router
