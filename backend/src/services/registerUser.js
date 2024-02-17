import { generateRandomSalt, hashPassword } from "../utils/hash.js";
import { User } from "../models/index.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendVerificationEmail } from "../utils/verificationEmail.js";

//userInfo = { name*, email*, password*, boatLicense*, profilePictureUrl }
export async function registerUser({
  name,
  email,
  password,
  boatLicense,
  profilePictureUrl,
}) {
  const sixDigitCode = generateRandomSixDigitCode();
  const passwordSalt = generateRandomSalt();
  const passwordHash = hashPassword(password, passwordSalt);

  const user = new User({
    name,
    email,
    passwordHash,
    passwordSalt,
    boatLicense,
    profilePictureUrl,
    sixDigitCode,
    emailVerified: false,
  });
  await user.save();

  await sendVerificationEmail(user);

  return userToProfileInfo(user);
}

function userToProfileInfo({
  _id,
  name,
  email,
  boatLicense,
  profilePictureUrl,
}) {
  return { _id, name, email, boatLicense, profilePictureUrl };
}

function generateRandomSixDigitCode() {
  return Math.random().toString().slice(2, 8);
}
