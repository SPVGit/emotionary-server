# EMOTIONARY-SERVER (MERN APPLICATION) By ALESSANDRO IADAROLA, SUBARNA PAUL VIGNARAJAH, VANYA MARKOVA

GitHub Link to client - https://github.com/SPVGit/emotionary-client

## PROJECT DESCRIPTION

Emotionary is an app that helps you track and understand your emotions, providing suggestions to improve your wellbeing. It allows you to record and analyze your emotions, offering personalized recommendations for managing them. The app also features a chat function to connect with your therapist for support. Emotionary's mission is to enhance self-awareness, address emotional challenges, and promote overall welfare.

## APP LINK:

Deployment Link client - https://emotionary-client.netlify.app

## FOLDER STRUCTURE

    emotionary-server
    |
    |
    |
    |---config---index.js
    |
    |
    |
    |---db---index.js
    |
    |
    |
    |---error---handling---index.js
    |
    |
    |
    |---middleware---jwt.middleware.js
    |
    |
    |
    |---models---Activity.model.js, Conversation.model.js, Message.model.js, Post.model.js, Therapist.model.js,
    |       |----User.model.js
    |
    |
    |
    |---routes---activity.routes.js, auth.routes.js, chat.routes.js, index.routes.js, post.routes.js,
    |       |----therapist.routes.js, user.routes.js
    |
    |
    |
    app.js
    |
    |
    |
    server.js

## DEPENDENCIES

bcryptjs, cookie-parser, cors, dotenv, express, express-jwt, express-session, jsonwebtoken, mongodb, mongoose,
morgan, multer, socket.io.

## REFERENCES

The code for chat functionality was obtained and adapted from https://github.com/ManishPoduval/simple-chat-socketio
