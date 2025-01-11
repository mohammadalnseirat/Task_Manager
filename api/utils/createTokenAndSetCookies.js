import jwt from "jsonwebtoken";

export const createTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  //? set The cookie:
  res.cookie("jwt_token", token, {
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // only set cookie on production environment
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day in milliseconds
  });
  return token;
};
