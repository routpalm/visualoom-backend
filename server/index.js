// ./index.js

require('dotenv').config({ path: './config/config.env' });
const express = require('express');


// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Set up and configure components
const sequelize = require('./config/setupSequelize');
const setupExpress = require('./config/setupExpress');
const setupPassport = require('./config/setupPassport');
const setupRoutes = require('./config/setupRoutes');

setupExpress(app);
setupPassport(app);
setupRoutes(app);

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
