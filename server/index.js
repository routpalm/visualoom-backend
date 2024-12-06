// ./server/index.js
// Entry Point for the Application
// Author: Brett DeWitt
// Created: October 27, 2024
//
// Description:
// This file serves as the entry point for the application. It is responsible
// for configuring the environment, initializing the main components of the
// system, and starting the Express server. The following steps are performed:
// 1. Load environment variables from ./config/config.env when in the
//    development environment.
// 2. Set up Sequelize for database connection and models.
// 3. Configure Express with middleware and settings.
// 4. Load routes to expose the API endpoints.
// 5. Start the Express server and listen on the designated port.


// --------------------- Package Imports ---------------------
// Load environment variables for development; test/production environments
// rely on externally supplied variables.
if (process.env.NODE_ENV !== 'test') {
    require('dotenv').config({ path: './config/config.env' });
}
console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("DATABASE_URL: " + process.env.DATABASE_URL);
const express = require('express');


// --------------------- Application Setup ---------------------
// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3001;


// Import configuration scripts for application setup
const sequelize = require('./config/setupSequelize');
const setupExpress = require('./config/setupExpress');
const setupRoutes = require('./config/setupRoutes');

// Apply configurations
setupExpress(app);
setupRoutes(app);


// --------------------- Start Server ---------------------
// Start the Express server and listen for incoming requests
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
