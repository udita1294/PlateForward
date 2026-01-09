import mongoose from "mongoose";
import User from "../models/User.js";
import "dotenv/config";
import connectDB from "../config/db.js";

const updateRole = async () => {
  const email = process.argv[2];
  const role = process.argv[3];

  if (!email || !role) {
    console.log("Usage: node scripts/updateUserRole.js <email> <role>");
    process.exit(1);
  }

  await connectDB();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found.`);
      process.exit(1);
    }

    user.role = role;
    await user.save();
    console.log(`User ${email} updated to role: ${role}`);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

updateRole();
