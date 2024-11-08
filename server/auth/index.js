// ./server/auth/index.js


const initializePassport = require('./setupPassport');
const authRoutes = require('./authRoutes');

module.exports = {
    initializePassport,
    authRoutes
};
