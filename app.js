// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config()

// ℹ️ Connects to the database
require("./db")

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express")

const app = express()

const { isAuthenticated } = require("./middleware/jwt.middleware")

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app)

// 👇 Start handling routes here
/* const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes); */

/* const allRoutes = require("./routes");
app.use("/api", allRoutes);  */

const authRouter = require("./routes/auth.routes") //  <== IMPORT
app.use("/auth", authRouter)

const postRouter = require("./routes/post.routes")
app.use("/", isAuthenticated, postRouter)

const activityRouter = require("./routes/activity.routes")
app.use("/", isAuthenticated, activityRouter)

const indexRouter = require("./routes/index.routes")
app.use("/", isAuthenticated, indexRouter)

const chatRouter = require("./routes/chat.routes")
app.use("/", isAuthenticated, chatRouter)

const { MongoClient, ServerApiVersion } = require("mongodb")
const uri = `mongodb+srv://aziendacreativa:${process.env.ATLAS_DB}@cluster-emotionary.qbk9bev.mongodb.net/?retryWrites=true&w=majority`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to Online MongoDB!")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app)

module.exports = app
