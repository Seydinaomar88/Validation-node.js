const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (data) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // validation password
  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!regex.test(password)) {
    throw new Error('Password must have 8 chars, uppercase & lowercase');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};

exports.loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  //BLOQUAGE USER
  if (user.isBlocked) {
    throw new Error('Account blocked by admin');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    },
    token
  };
};