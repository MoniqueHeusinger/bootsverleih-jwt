import { generateRandomSalt, hashPassword } from "../utils/hash.js";
import { User } from "../models/index.js";

//userInfo = { name*, email*, password*, boatLicense*, profilePictureUrl }
export async function registerUser({
  name,
  email,
  password,
  boatLicense,
  profilePictureUrl,
}) {
  const passwordSalt = generateRandomSalt();
  const passwordHash = hashPassword(password, passwordSalt);

  const user = new User({
    name,
    email,
    passwordHash,
    passwordSalt,
    boatLicense,
    profilePictureUrl,
  });
  await user.save();
  return userToProfileInfo(user);
}

function userToProfileInfo({ name, email, boatLicense, profilePictureUrl }) {
  return { name, email, boatLicense, profilePictureUrl };
}
