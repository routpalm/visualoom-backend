const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verifyJWT } = require('../controllers/authController');

// TODO: Protect sensitive routes using verifyJWT


router.get('/:id', usersController.getUserById)
router.get('/:id/likes', usersController.getUserLikes)
router.get('/:id/artwork', usersController.getUserArtworks)

router.post('/:id', usersController.createUser);

router.put('/:id', usersController.updateUser)

router.delete(':id', usersController.deleteUser)

module.exports = router;
