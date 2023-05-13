// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config()

// ℹ️ Connects to the database
require("./db")

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express")

const app = express()

const { isAuthenticated, isTherapist } = require("./middleware/jwt.middleware")

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app)

const authRouter = require("./routes/auth.routes") //  <== IMPORT
app.use("/auth", authRouter)

const postRouter = require("./routes/post.routes")
app.use("/", isAuthenticated, postRouter)

const activityRouter = require("./routes/activity.routes")
app.use("/", isAuthenticated, activityRouter)

const indexRouter = require("./routes/index.routes")
app.use("/", indexRouter)

const chatRouter = require("./routes/chat.routes")
app.use("/", isAuthenticated, isTherapist, chatRouter)

const therapistRouter = require("./routes/therapist.routes")
app.use("/",isAuthenticated, isTherapist, therapistRouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app)

module.exports = app
