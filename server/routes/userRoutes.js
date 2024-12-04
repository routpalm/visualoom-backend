// ./server/routes/userRoutes.js


// Provides sub-routes for the '/users' branch of the API


const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { decodeJWTAndMapUser } = require('../controllers/authController');

router.get('/map-jwt', decodeJWTAndMapUser);
router.get('/:id', usersController.getUserById)
router.get('/:id/likes', usersController.getUserLikes)
router.get('/:id/artwork', usersController.getUserArtworks)
router.get('/map-jwt', decodeJWTAndMapUser);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser)

router.delete('/:id', usersController.deleteUser)

module.exports = router;
