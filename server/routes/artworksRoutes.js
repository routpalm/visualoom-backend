// ./server/routes/artworksRoutes.js


const router = require('express').Router();
const artworksController = require('../controllers/artworksController');


// GET
router.get('/', artworksController.getAllArtworks)
router.get('/:id', artworksController.getArtworkById)
router.get('/:id/artist', artworksController.getArtworkUser)
// router.get('/:id/params', artworksController.getArtworkParams)
router.get('/:id', artworksController.getArtworkLikes)

// POST
router.post('/:id', artworksController.createArtwork)

// PUT
router.put('/:id', artworksController.updateArtwork)

// DELETE
router.delete('/id:', artworksController.deleteArtwork)


module.exports = router;
