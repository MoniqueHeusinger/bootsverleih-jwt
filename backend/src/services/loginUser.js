import { User } from "../models/index.js";
import { hashPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";

export async function loginUser({ email, password }) {
  // 1. login credentials validieren
  const foundUser = await User.findOne({ email });
  if (!foundUser) throw new Error("User with this email doesn't exist");
  if (!foundUser.emailVerified) throw new Error("Email still not verified");

  // check password
  const passwordHash = hashPassword(password, foundUser.passwordSalt);
  const correctPassword = passwordHash === foundUser.passwordHash;
  if (!correctPassword) throw new Error("Wrong password");

  // 2. Token generieren und senden (user pofile info noch für's frontend)
  const accessToken = createToken(foundUser, "access"); // exp. 1h - "access" neu für refreshToken
  const refreshToken = createToken(foundUser, "refresh"); // exp. 10d neu für refreshToken
  return {
    user: userToProfileInfo(foundUser),
    tokens: { accessToken, refreshToken }, // neu für refreshToken
  };
}

function userToProfileInfo({ name, email, boatLicense, profilePictureUrl }) {
  return { name, email, boatLicense, profilePictureUrl };
}
