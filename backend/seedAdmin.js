require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/User');

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    const email = "admin@test.com";
    const password = "Admin1234";

    const exist = await User.findOne({ email });

    if (exist) {
      console.log("Admin existe déjà");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
      permissions: ["like", "create", "update", "delete"]
    });

    console.log("Admin créé avec succès ");
    console.log(admin.email);

    process.exit();

  } catch (error) {
    console.log("Erreur seed admin:", error.message);
    process.exit(1);
  }
};

createAdmin();