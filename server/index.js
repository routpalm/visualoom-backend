// ./index.js


// Entry point for the application. This file loads environment
// variables from ./config/config.env if it exists, runs the
// setupscripts for Sequelize and Express, run the scripts which
// expose the routes for the API, and finally starts the Express server.


// imports
require('dotenv').config({ path: './config/config.env' });
const express = require('express');


// initialize express
const app = express();
const PORT = process.env.PORT || 3001;


// set up and configure components
const sequelize = require('./config/setupSequelize');
const setupExpress = require('./config/setupExpress');
const setupRoutes = require('./config/setupRoutes');

setupExpress(app);
setupRoutes(app);


// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
