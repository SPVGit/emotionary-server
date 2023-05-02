const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here")
})

router.get("/chat", (req, res, next) => {
  res.json("chat page")
})

module.exports = router
