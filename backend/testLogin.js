import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.findOne({ email: "anotheradmin@example.com" });
    if (!user) return console.log("❌ User not found");

    const isMatch = await bcrypt.compare("admin456", user.password);
    console.log("Password match?", isMatch);
    mongoose.connection.close();
  })
  .catch(console.error);
