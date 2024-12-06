// ./server/config/setupRoutes.js

// Author - Brett DeWitt
// Created - Saturday, November 2, 2024, 8:38:29 PM
// Configures API routes for the application
// Each route branch is imported from its respective file and linked to the Express app


// ---------------------- Import Routes ----------------------
/**
 * Import route handlers for various API endpoints.
 * Each route corresponds to a specific feature of the application.
 */
const baseRoutes = require('../routes/baseRoutes');
const helloWorldRoutes = require('../routes/helloWorldRoutes');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const artworksRoutes = require('../routes/artworksRoutes');
const likeRoutes = require('../routes/likeRoutes');
const adminRoutes = require('../routes/adminRoutes');


// ---------------------- Setup Routes ----------------------
/**
 * Configures all the routes for the Express app.
 * Binds route handlers to the appropriate URL paths.
 * @param {Object} app - The Express application instance.
 */
function setupRoutes(app) {
    app.use('/', baseRoutes);
    app.use('/helloworlds', helloWorldRoutes);
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/artworks', artworksRoutes);
    app.use('/likes', likeRoutes);
    app.use('/admin', adminRoutes);
}


module.exports = setupRoutes;
