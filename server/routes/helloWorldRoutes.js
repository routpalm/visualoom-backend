const express = require('express');
const router = express.Router();
const helloWorldController = require('../controllers/helloWorldController');
const { verifyJWT } = require('../controllers/authController');


// Provides sub-routes for the '/helloWorlds' branch of the API


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



// GET HelloWorld objects filtered by parameters
router.get('/protected',
    verifyJWT,
    helloWorldController.getHelloWorld);

// GET HelloWorld by id
router.get('/protected/:id',
    verifyJWT,
    helloWorldController.getHelloWorldById);

// POST new HelloWorld
router.post('/protected/',
    verifyJWT,
    helloWorldController.createHelloWorld);

// PUT data into existing HelloWorld
router.put('/protected/:id',
    verifyJWT,
    helloWorldController.modifyHelloWorld);

// DELETE existing HelloWorld
router.delete('/protected/:id',
    verifyJWT,
    helloWorldController.deleteHelloWorld)

module.exports = router;
