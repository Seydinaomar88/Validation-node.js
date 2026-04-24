const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");

// ADMIN : GET ALL POSTS
router.get("/posts", auth, postController.getAll);

// ADMIN : DELETE POST
router.delete("/posts/:id", auth, postController.remove);

module.exports = router;