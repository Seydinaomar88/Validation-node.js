const User = require('../models/User');

module.exports = (permission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(401).json({
          message: "Utilisateur introuvable"
        });
      }

      // admin bypass
      if (user.role === 'admin') {
        return next();
      }

      // check permission
      if (!user.permissions.includes(permission)) {
        return res.status(403).json({
          message: `Action refusée : vous ne pouvez pas '${permission}'`,
          yourPermissions: user.permissions
        });
      }

      next();

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
};