const express = require("express");
const nodecron = require("../routes/node-cron");
const configureMiddleware = require("../config/middleware.js");

const server = express();

// nodecron();

configureMiddleware(server);

module.exports = server;
