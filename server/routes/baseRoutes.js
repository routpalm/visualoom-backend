const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');

// Define the GET route
router.get('/', baseController.getBaseResponse);

module.exports = router;
