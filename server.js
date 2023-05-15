// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
require("dotenv").config()
const PORT = process.env.PORT || 5008

const express = require("express")
const app = require("./app")

const cors = require("cors")
//const { createServer } = require("http")
//const { Server } = require("socket.io")

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
