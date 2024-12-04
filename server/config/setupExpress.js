// ./server/config/setupExpress.js


// Initializes the Express instance used for routing and
// controlling the API. Sessions are no longer used by
// the front end, but the support was left in place just
// in case. CORS (cross-origin resource sharing) support
// is necessary for modern browsers to allow access to
// the resources provided by the back end.


const cors = require("cors");
const express = require("express");
const session = require("express-session");
const sessionConfig = require("./sessionConfig")();


function setupExpress(app) {
    app.use(express.json());
    app.use(session(sessionConfig));    // TODO: Probably don't need this anymore
    app.use(cors({
        credentials: true
    })); //
}


module.exports = setupExpress;
