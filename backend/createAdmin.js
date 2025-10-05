import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js"; // adjust path if needed

dotenv.config();

const ADMIN_EMAIL = "anotheradmin@example.com";
const ADMIN_PASSWORD = "admin456"; // password you will use to log in
const ADMIN_NAME = "Second Admin";

const createOrResetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    let admin = await User.findOne({ email: ADMIN_EMAIL });

    if (admin) {
      // Reset password if admin exists
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      admin.password = hashedPassword;
      admin.isAdmin = true; // just in case
      await admin.save();
      console.log(`⚡ Admin already exists. Password has been reset to "${ADMIN_PASSWORD}"`);
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      admin = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        isAdmin: true,
      });
      console.log(`✅ New admin created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
    }

    mongoose.connection.close();
    console.log("🔒 Done. You can now log in with this admin account.");
  } catch (err) {
    console.error("❌ Error creating/resetting admin:", err);
    mongoose.connection.close();
  }
};

createOrResetAdmin();
