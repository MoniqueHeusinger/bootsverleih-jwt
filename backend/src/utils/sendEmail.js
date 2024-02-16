import { google } from "googleapis"; // OAUTH and credentials
import nodemailer from "nodemailer"; // EMail senden
import dotenv from "dotenv";

dotenv.config();

const GMAIL_ADRESS = process.env.GMAIL_ADRESS;
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN; // OAUTH2 Refresh token

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendEmail({ to, subject, text }) {
  try {
    // 1. Schritt: access token zum Mailversenden erhalten --> auf Grundlage von oAuth2Client credentials und refresh_token
    const accessToken = await oAuth2Client.getAccessToken();

    // 2. Schritt: Email transporter erstellen
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_ADRESS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // 3. Schritt: Funktion "send email" erstellen
    const sendMessageInfo = await transporter.sendMail({
      from: "Serafina's Dreamboats <noreply@serafinas-dreamboats.com>",
      to,
      subject,
      text,
      html: text.replaceAll("\n", "<br/>"),
    });
    console.log("sendMessageInfo: ", sendMessageInfo);

    const success = sendMessageInfo.accepted.includes(to);
    return success;
  } catch (error) {
    console.log(error);
    return false; // no success
  }
}
