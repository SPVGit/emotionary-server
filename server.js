// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
require("dotenv").config()
const PORT = process.env.PORT || 5005

const express = require("express")
const app = require("./app")

const cors = require("cors")
//const { createServer } = require("http")
//const { Server } = require("socket.io")

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
