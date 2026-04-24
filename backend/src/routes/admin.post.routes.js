const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");

// ADMIN - voir tous les posts
router.get("/", auth, postController.getAll);

// ADMIN - voir un post
router.get("/:id", auth, postController.getOne);

// ADMIN - supprimer post
router.delete("/:id", auth, postController.remove);

module.exports = router;