// ./server/config/setupRoutes.js

const baseRoutes = require('../routes/baseRoutes');
const helloWorldRoutes = require('../routes/helloWorldRoutes');
const authRoutes = require('../auth/authRoutes');


function setupRoutes(app) {
    app.use('/', baseRoutes);
    app.use('/helloworld', helloWorldRoutes);
    app.use('/auth', authRoutes);
    // app.use('/api', apiRoutes);
}


module.exports = setupRoutes;
