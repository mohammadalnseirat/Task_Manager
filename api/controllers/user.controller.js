import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { handleError } from "../utils/error.js";

//! 1- Function to get Team:
export const getTeamList = async (req, res, next) => {
  try {
    const users = await User.find().select("name title email role isActive");
    if (!users) {
      return next(handleError(404, "No users found."));
    }
    res.status(200).json(users);
  } catch (error) {
    console.log("Error getting team", error.message);
    next(error);
  }
};
