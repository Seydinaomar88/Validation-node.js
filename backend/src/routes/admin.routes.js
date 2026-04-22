const router = require('express').Router();

const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');
const adminController = require('../controllers/admin.controller');

router.get('/users', auth, admin, adminController.getAllUsers);

router.put('/users/:id/role', auth, admin, adminController.updateRole);

router.put('/users/:id/permissions', auth, admin, adminController.updatePermissions);

router.put('/users/:id/block', auth, admin, adminController.toggleBlock);

module.exports = router;