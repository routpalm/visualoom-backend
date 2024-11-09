// ./server/config/setupRoutes.js


const baseRoutes = require('../routes/baseRoutes');
const helloWorldRoutes = require('../routes/helloWorldRoutes');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');


function setupRoutes(app) {
    app.use('/', baseRoutes);
    app.use('/helloworlds', helloWorldRoutes);
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
}


module.exports = setupRoutes;
