import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protects routes by verifying the JWT sent in the
 * Authorization header as: "Bearer <token>"
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      return next();
    } catch (error) {
      res.status(401);
      return next(new Error("Not authorized, token invalid"));
    }
  }

  res.status(401);
  return next(new Error("Not authorized, no token provided"));
};

export default protect;
