import { User } from "../models/index.js";
import { sendVerificationEmail } from "../utils/verificationEmail.js";

export async function resendEmail({ userId }) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // wenn man den Coder erneuern möchte:
  // user.sixDigitCode = new code;
  // await user.save()

  await sendVerificationEmail(user);

  return userToProfileInfo(user);
}

function userToProfileInfo({ _id, name, email, bio, profilePictureUrl }) {
  return { _id, name, email, bio, profilePictureUrl };
}
