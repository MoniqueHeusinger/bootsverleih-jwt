import { sendEmail } from "./sendEmail.js";

export async function sendVerificationEmail(user) {
  const nameArr = user.name.split(" ");
  const vorname = nameArr[0];

  return sendEmail({
    to: user.email,
    subject: "Please verify your account",
    text: `Ahoi ${vorname},
        willkommen bei Serafina's Dreamboats.
        Bitte bestätige deine Anmeldung mit dem folgenden Pin-Code, um die Registrierung auf unserer Seite abzuschließen: ${user.sixDigitCode}.
        Viele Grüße,
        Dein Team von Serafina's Dreamboats`,
  });
}
