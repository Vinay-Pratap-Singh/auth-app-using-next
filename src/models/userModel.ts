import mongoose, { MongooseError } from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your full name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    trim: true,
    unique: true,
    pattern: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please provide a phone number"],
    trim: true,
    unique: true,
    pattern: [
      /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/,
      "Please provide a valid phone number",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    pattern: [
      /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/,
      "Please provides a strong password",
    ],
  },

  // some common fields
  isVerified: {
    type: "Boolean",
    default: false,
  },
  role: {
    type: [String],
    default: ["user"],
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
