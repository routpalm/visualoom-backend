const express = require('express');
const router = express.Router();
const helloWorldController = require('../controllers/helloWorldController');

// Define the GET route
router.get('/', helloWorldController.getHelloWorld);

// Define the POST route (if needed)
router.post('/', helloWorldController.createHelloWorld);

module.exports = router;
