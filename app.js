// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

const { isAuthenticated } = require("./middleware/jwt.middleware");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
/* const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes); */

/* const allRoutes = require("./routes");
app.use("/api", allRoutes);  */

const authRouter = require("./routes/auth.routes");       //  <== IMPORT
app.use("/auth", authRouter);

const postRouter = require("./routes/post.routes");
app.use("/", isAuthenticated, postRouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
