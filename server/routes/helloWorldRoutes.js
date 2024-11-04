const express = require('express');
const router = express.Router();
const helloWorldController = require('../controllers/helloWorldController');


// GET HelloWorld objects filtered by parameters
router.get('/', helloWorldController.getHelloWorld);

// GET HelloWorld by id
router.get('/:id', helloWorldController.getHelloWorldById);

// POST new HelloWorld
router.post('/', helloWorldController.createHelloWorld);

// PUT data into existing HelloWorld
router.put('/:id', helloWorldController.modifyHelloWorld);

// DELETE existing HelloWorld
router.delete('/:id', helloWorldController.deleteHelloWorld)


module.exports = router;
