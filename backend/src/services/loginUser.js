import { User } from "../models/index.js";
import { hashPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";

export async function loginUser({ email, password }) {
  // 1. login credentials validieren
  const foundUser = await User.findOne({ email });
  if (!foundUser) throw new Error("User with this email doesn't exist");

  // check password
  const passwordHash = hashPassword(password, foundUser.passwordSalt);
  const correctPassword = passwordHash === foundUser.passwordHash;
  if (!correctPassword) throw new Error("Wrong password");

  // 2. Token generieren und senden (user pofile info noch für's frontend)
  const accessToken = createToken(foundUser);
  return {
    user: userToProfileInfo(foundUser),
    tokens: { accessToken },
  };
}

function userToProfileInfo({ name, email, boatLicense, profilePictureUrl }) {
  return { name, email, boatLicense, profilePictureUrl };
}
