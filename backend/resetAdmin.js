import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const ADMIN_EMAIL = "anotheradmin@example.com";
const ADMIN_PASSWORD = "admin456";

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Remove old admin
    await User.deleteMany({ email: ADMIN_EMAIL });

    // Create new admin **without double hashing**
    const admin = new User({
      name: "Second Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD, // raw password, will hash once via pre-save hook
      isAdmin: true,
    });

    await admin.save(); // triggers the pre-save hook correctly
    console.log("✅ Admin reset:", admin);

    mongoose.connection.close();
  })
  .catch(err => console.error(err));
