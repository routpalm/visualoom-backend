// ./server/config/setupRoutes.js


const baseRoutes = require('../routes/baseRoutes');
const helloWorldRoutes = require('../routes/helloWorldRoutes');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const artworksRoutes = require('../routes/artworksRoutes');
const likeRoutes = require('../routes/likeRoutes');


function setupRoutes(app) {
    app.use('/', baseRoutes);
    app.use('/helloworlds', helloWorldRoutes);
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/artworks', artworksRoutes);
    app.use('/likes', likeRoutes);
}


module.exports = setupRoutes;
