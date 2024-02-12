import { User } from "../models/index.js";
import { hashPassword } from "../utils/hash.js";

export async function doBasicAuth(req, res, next) {
  const _invalidAuthResponse = (message) =>
    res
      .status(401)
      .json({ success: false, message: message || "Invalid authentication" });

  //example: req.headers.authorization : "Basic ZnJlZGR5QHRocmVlLmNvbTptYXVzaTEyMw=="
  const authorization = req.headers.authorization;
  if (!authorization) return _invalidAuthResponse();

  const [authType, authDataBase64] = authorization.split(" ");
  if (authType !== "Basic" || !authDataBase64) return _invalidAuthResponse();

  //email:password
  const authData = Buffer.from(authDataBase64, "base64").toString();
  const [email, password] = authData.split(":");
  if (!email || !password) return _invalidAuthResponse();

  // perform authentication -> wie ein mini login hier bei Basic Auth
  // Note: could extract this part to a "login-service"
  const foundUser = await User.findOne({ email });
  if (!foundUser)
    return _invalidAuthResponse("User with this email doesn't exist");

  const passwordHash = hashPassword(password, foundUser.passwordSalt);
  const correctPassword = passwordHash === foundUser.passwordHash;
  if (!correctPassword) return _invalidAuthResponse("Wrong password");

  // success, correct email and password -> next() goes to next request-handler/controller
  req.authenticatedUser = foundUser; //save user info request for next request-handler/controller
  next();
}
