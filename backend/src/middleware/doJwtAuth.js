import jwt from "jsonwebtoken";

export async function doJwtAuth(req, res, next) {
  const _invalidAuthResponse = (message) =>
    res
      .status(401)
      .json({ success: false, message: message || "Invalid authentication" });

  try {
    const tokenString = extractTokenFromRequest();
    // try/catch, weil jwt.verify() einen Fehler wirft, sollte der Token nicht valide sein

    const tokenPayload = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.verifiedUserClaims = tokenPayload; // { sub === id --> user from db, iat, exp, type }
    next(); // jwt valid -> next()
  } catch (error) {
    // jwt invalid
    console.log(error);
    return _invalidAuthResponse("Invalid token");
  }

  function extractTokenFromRequest() {
    // Annahme: es ist ein access token --> in headers.authorization nachsehen
    //  example: req.headers.authorization: 'Bearer header.payload.signature'

    const authorization = req.headers.authorization;
    if (authorization) {
      const [authType, tokenString] = authorization.split(" ");
      if (authType !== "Bearer" || !tokenString) return null;
      else return tokenString;
    } else {
      // wenn im header nichts ist --> Annahme: es ist eine refresh Token (true oder undefined)
      return req.session.refreshToken;
    }
  }
}
