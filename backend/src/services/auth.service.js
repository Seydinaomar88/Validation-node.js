const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (data) => {
    const { name, email, password } = data;

    // ici on va verifier est ce que l'utilisateur existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creation de l'utilisateur
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    exports.loginUser = async (data) => {
        const { email, password } = data;

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // verification mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        //Generer token
        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );

        return { user, token};
    };
}