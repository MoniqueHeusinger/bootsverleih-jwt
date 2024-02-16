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

  //   const nameArr = name.split(" ");
  //   const vorname = nameArr[0];

  //   await sendEmail({
  //     to: "example@mail.com",
  //     subject: "Kontobetätigung",
  //     text: `Hallo ${vorname},<br>
  // vielen Dank für die Registrierung bei Serafina's Dreamboats.<br>
  // Zum Abschluss des Registrierungsvorgangs ist nur noch 1 Schritt notwendig:
  // --> Klicke auf folgenden Link und bestätige damit deine Anmeldung: <a href="http://localhost:3001/api/boote" style="margin-top:10px; display:inline-block; background-color:blue; color:white; border:none; border-radius:20px; padding:5px 20px;">hier klicken</a><br><br>
  // Viel Spaß auf unserer Seite!<br>
  // Dein Team von Serafina's Dreamboats`,
  //   });

  await sendVerificationEmail(user);

  return userToProfileInfo(user);
}

function userToProfileInfo({ name, email, boatLicense, profilePictureUrl }) {
  return { name, email, boatLicense, profilePictureUrl };
}

function generateRandomSixDigitCode() {
  return Math.random().toString().slice(2, 8);
}
