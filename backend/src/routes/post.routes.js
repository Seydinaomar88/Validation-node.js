const router = require('express').Router();

const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', postController.getAll);
router.get('/:id', postController.getOne);

router.post('/', authMiddleware, postController.create);

router.put('/:id', authMiddleware, postController.update);

router.delete('/:id', authMiddleware, postController.remove);

router.post('/:id/like', authMiddleware, postController.like);

module.exports = router;