const authService = require('../services/auth.service');

/**
 * REGISTER
 */
exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      user,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Erreur lors de l'inscription"
    });
  }
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      ...data,
    });

  } catch (error) {

    // 🔥 gestion propre des erreurs
    if (error.message.includes("bloqué")) {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }

    if (error.message.includes("incorrect")) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    res.status(400).json({
      success: false,
      message: error.message || "Erreur de connexion"
    });
  }
};