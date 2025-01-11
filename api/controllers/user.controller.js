import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { handleError } from "../utils/error.js";
import { createTokenAndSetCookies } from "../utils/createTokenAndSetCookies.js";

//! 1-Function To Register User:
export const registerUser = async (req, res, next) => {
  try {
    const { name, title, email, password, role, isAdmin } = req.body;
    if (!name || !title || !email || !password || !role) {
      return next(handleError(400, "Please provide all required fields."));
    }
    //? check password:
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return next(
        handleError(
          400,
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        )
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(handleError(401, "User already exists!"));
    }
    //? Create a new user:
    const user = await User.create({
      name,
      title,
      email,
      password,
      role,
      isAdmin,
    });
    if (user) {
      user.isAdmin ? createTokenAndSetCookies(user._id, res) : null;
      user.password = undefined;
      res.status(201).json(user);
    } else {
      next(handleError(400, "Invalid user data."));
    }
  } catch (error) {
    console.log("Error registering user", error.message);
    next(error);
  }
};
