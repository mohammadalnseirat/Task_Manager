import User from "../models/user.model.js";
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

//! 2-Function To Login User:
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(handleError(400, "Please provide email and password."));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(handleError(404, "Invalid email or password."));
    }
    if (!user.isActive) {
      return next(
        handleError(
          401,
          "User account has been deactivated, contact the administrator"
        )
      );
    }
    const isMatchPassword = await user.matchPassword(password);
    if (!isMatchPassword) {
      return next(handleError(401, "Invalid password or email."));
    }
    if (user && isMatchPassword) {
      createTokenAndSetCookies(user._id, res);
      user.password = undefined;
      res.status(200).json(user);
    } else {
      next(handleError(500, "Ivalid user data."));
    }
  } catch (error) {
    console.log("Error logging in user", error.message);
    next(error);
  }
};

//! 3-Function To Logout User:

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("jwt_token");
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log("Error logging out user", error.message);
    next(error);
  }
};
