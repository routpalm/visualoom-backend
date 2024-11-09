// ./server/config/setupEpress.js

const cors = require("cors");
const express = require("express");
const session = require("express-session");
const sessionConfig = require("./sessionConfig")();


function setupExpress(app) {
    app.use(express.json());
    app.use(session(sessionConfig));    // TODO: Probably don't need this
    app.use(cors({
        credentials: true
    }));
}


module.exports = setupExpress;
