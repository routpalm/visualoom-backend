// ./server/routes/likeRoutes.js


const router = require("express").Router();
const likesController = require("../controllers/likesController");

// TODO: Add some check to make sure that createLike
//       references an existing user and artwork

// GET
router.get("/", likesController.getLikes)
router.get("/:id", likesController.getLikeById)
router.get("/:id/user", likesController.getLikeUser)
router.get("/:id/artwork", likesController.getLikeArtwork)

// POST
router.post("/", likesController.createLike)

// PUT
router.put("/:id", likesController.modifyLike)

// DELETE
router.delete("/:id", likesController.deleteLike)


// export
module.exports = router;
