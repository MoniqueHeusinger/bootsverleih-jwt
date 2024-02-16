import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    // boatLicense: { type: Boolean, required: true },
    boatLicense: { type: Boolean },
    profilePictureUrl: { type: String },
    sixDigitCode: { type: String },
    emailVerified: { type: Boolean, default: false },
  },

  { collection: "users", timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
