// ./index.js


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
