// ./server/routes/artworksRoutes.js


const router = require('express').Router();
const artworksController = require('../controllers/artworksController');

// TODO: Add some checks to make sure that createArtwork
//       references an existing user

// GET
router.get('/', artworksController.getAllArtworks)
router.get('/:id', artworksController.getArtworkById)
router.get('/:id/user', artworksController.getArtworkUser)
router.get('/:id/likes', artworksController.getArtworkLikes)

// POST
router.post('/', artworksController.createArtwork)

// PUT
router.put('/:id', artworksController.updateArtwork)

// DELETE
router.delete('/id:', artworksController.deleteArtwork)


module.exports = router;
