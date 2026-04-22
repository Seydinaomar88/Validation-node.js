const router = require('express').Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const permission = require('../middlewares/permission.middleware');

// CREATE (permission create)
router.post(
  '/',
  authMiddleware,
  permission('create'),
  postController.create
);

// READ (public)
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);

// UPDATE (permission update + owner check)
router.put(
  '/:id',
  authMiddleware,
  permission('update'),
  postController.update
);

// DELETE
router.delete(
  '/:id',
  authMiddleware,
  permission('delete'),
  postController.remove
);

module.exports = router;