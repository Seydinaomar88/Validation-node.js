const User = require('../models/User');

// Voir tous les users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// changer rôle
exports.updateRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password');

  res.json(user);
};

// changer permissions
exports.updatePermissions = async (req, res) => {
  const { permissions } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { permissions },
    { new: true }
  ).select('-password');

  res.json(user);
};

// bloquer / débloquer user
exports.toggleBlock = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isBlocked = !user.isBlocked;

  await user.save();

  res.json({
    message: user.isBlocked ? 'User blocked' : 'User unblocked',
    user
  });
};