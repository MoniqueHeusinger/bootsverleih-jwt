import crypto from "crypto";

//  Hash-Funktion
export function hash(inputStr) {
  return crypto.createHash("sha512").update(inputStr).digest("hex");
}

// Salt-Funktion (erstellt einen random String)
export function generateRandomSalt() {
  const BYTES_LENGTH = 64;
  return crypto.randomBytes(BYTES_LENGTH).toString("base64");
}

// Zusammenführen von Hash und Salt zu einem Passwort-Hash
export function hashPassword(password, salt) {
  if (!password || !salt)
    throw new Error("password and salt must be defined for hashing");
  return hash(`${password}${salt}`);
}
