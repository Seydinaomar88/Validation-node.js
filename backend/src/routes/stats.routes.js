const router = require("express").Router();
const statsController = require("../controllers/stats.controller");

// GET /api/stats
router.get("/", statsController.getStats);

module.exports = router;