// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config()

// ℹ️ Connects to the database
require("./db")

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express")

const path = require("path")

const app = express()


app.use(express.static(path.join(__dirname, 'build')));

const { isAuthenticated, isTherapist } = require("./middleware/jwt.middleware")

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware

require("./config")(app)

const indexRouter = require("./routes/index.routes")
app.use("/", indexRouter)

const authRouter = require("./routes/auth.routes") 
app.use("/auth", authRouter)

const postRouter = require("./routes/post.routes")
app.use("/", isAuthenticated, postRouter)

const activityRouter = require("./routes/activity.routes")
app.use("/", isAuthenticated, activityRouter)

const userRouter = require("./routes/user.routes")
app.use("/", isAuthenticated, userRouter)

const chatRouter = require("./routes/chat.routes")
app.use("/", isAuthenticated, chatRouter)

const therapistRouter = require("./routes/therapist.routes") //Only this route is for therapist only. Other routes above are for other users
app.use("/", isAuthenticated, isTherapist, therapistRouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app)

module.exports = app
