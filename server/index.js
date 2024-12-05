// ./index.js


// Entry point for the application. This file loads environment
// variables from ./config/config.env if we are in our development
// environment. For testing and production, the environment variables
// are supplied externally. Then we run setup scripts for Sequelize
// and Express, gollowed by the scripts which expose the routes for
// the API, and finally we start the Express server.


// imports
if (process.env.NODE_ENV !== 'test') {
    require('dotenv').config({ path: './config/config.env' });
}
console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("DATABASE_URL: " + process.env.DATABASE_URL);
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
