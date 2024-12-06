// ./server/config/setupExpress.js


// Author - Brett DeWitt
// Created - Saturday, November 2, 2024, 8:38:29 PM
// Configures the Express instance for the application
// Sets up middleware for handling CORS, JSON requests, and session management (though sessions are no longer used by the front end)


// ---------------------- Import Dependencies ----------------------
/**
 * Import necessary dependencies for configuring Express:
 * - 'cors' for cross-origin resource sharing.
 * - 'express' for creating the Express application.
 * - 'express-session' for session management.
 */
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const sessionConfig = require("./sessionConfig")();


// ---------------------- Setup Express ----------------------
/**
 * Configures middleware for the Express application:
 * - Parses incoming requests with JSON payloads.
 * - Adds session support (though potentially obsolete).
 * - Enables CORS for cross-origin requests, supporting credentials.
 *
 * @param {Object} app - The Express application instance to configure.
 */
function setupExpress(app) {
    app.use(express.json());
    app.use(session(sessionConfig));    // TODO: Probably don't need this anymore
    app.use(cors({
        credentials: true
    })); //
}

// Export the setup function
module.exports = setupExpress;
