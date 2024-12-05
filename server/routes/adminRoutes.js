// ./server/routes/adminRoutes.js


const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Only for development
if (process.env.NODE_ENV === 'development') {
    router.get('/resetdb', adminController.resetdb);
}

module.exports = router;
