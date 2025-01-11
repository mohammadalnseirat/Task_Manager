import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token) {
      return next(handleError(401, "Unauthorized - token not provided."));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        return next(handleError(401, "Unauthorized - Invalid token."));
      }
      const currentUser = await User.findById(decoded.userId).select(
        "email isAdmin"
      );
      if (!currentUser) {
        return next(handleError(404, "Unauthorized - User not found."));
      }
      req.user = {
        email: currentUser.email,
        isAdmin: currentUser.isAdmin,
        userId: decoded.userId,
      };
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(handleError(401, "Unauthorized - Token expired."));
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in protected route", error.message);
    next(error);
  }
};

//Admin routes:

export const isAdminRoute = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      next(handleError(401, "Unauthorized - User is not an admin."));
    }
  } catch (error) {
    console.log("Error in admin route", error.message);
    next(error);
  }
};
