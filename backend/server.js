const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

module.exports = {
  app,
  io,
  server,
  express,
};
