import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    boatLicense: { type: Boolean, required: true },
    profilePictureUrl: { type: String },
  },

  { collection: "users", timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
