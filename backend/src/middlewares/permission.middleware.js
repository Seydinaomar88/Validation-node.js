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

      // utilisateur bloqué
      if (user.isBlocked) {
        return res.status(403).json({
          message: "Votre compte est bloqué par l'administrateur"
        });
      }

      // admin bypass total
      if (user.role === 'admin') {
        req.currentUser = user;
        return next();
      }

      // vérification permission
      const hasPermission = user.permissions.includes(permission);

      if (!hasPermission) {
        return res.status(403).json({
          message: `Vous ne pouvez pas effectuer cette action : '${permission}'`,
          yourPermissions: user.permissions
        });
      }

      // inject user dans req
      req.currentUser = user;

      next();

    } catch (error) {
      return res.status(500).json({
        message: "Erreur serveur",
        error: error.message
      });
    }
  };
};