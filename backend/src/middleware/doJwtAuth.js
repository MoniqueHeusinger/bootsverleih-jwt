import jwt from "jsonwebtoken";

export async function doJwtAuth(req, res, next) {
  const _invalidAuthResponse = (message) =>
    res
      .status(401)
      .json({ success: false, message: message || "Invalid authentication" });

  //  example: req.headers.authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWM1ZTRjZDgxZWY1ODU0NmU1OWNjMWIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzA3NzMzNjkwLCJleHAiOjE3MDc3MzcyOTB9.m6rp-GyRiY4-6r3WJhmCY1KLESGaXHjRbS6I1uamELI',
  const authorization = req.headers.authorization;
  if (!authorization) return _invalidAuthResponse();

  const [authType, tokenString] = authorization.split(" ");
  if (authType !== "Bearer" || !tokenString) return _invalidAuthResponse();

  try {
    // try catch, weil jwt.verify() einen fehler wirft, sollte der token nicht valide sein
    const tokenPayload = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.verifiedUserClaims = tokenPayload; // { sub === id --> user from db, iat, exp, type }
    next(); // jwt valid -> next()
  } catch (error) {
    // jwt invalid
    console.log(error);
    return _invalidAuthResponse("Invalid token");
  }
}
