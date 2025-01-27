const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userType: { type: String, enum: ["free", "pro"], default: "free", required: true },
    avatar: { type: String, default: null }, // URL for the user's avatar
    coverPhoto: { type: String, default: null }, // URL for the user's cover photo
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
