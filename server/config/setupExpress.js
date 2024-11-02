// ./server/config/setupEpress.js

const express = require("express");
const session = require("express-session");
const sessionConfig = require("./sessionConfig")();


function setupExpress(app) {
    app.use(express.json());
    app.use(session(sessionConfig));
}

module.exports = setupExpress;