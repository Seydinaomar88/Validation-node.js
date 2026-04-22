const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  permissions: {
    type: [String],
    default: ['like','comment']
  },

  isBlocked: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);