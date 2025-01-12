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

//! 2- Function to get Notifications:
export const getNotificationsList = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return next(
        handleError(
          404,
          "User doest not exist, Please Login To get the notifications."
        )
      );
    }
    const notifications = await Notification.find({
      team: userId,
      isRead: { $nin: [userId] },
    })
      .sort({ createdAt: -1 })
      .populate("task", "title");
    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error getting notifications", error.message);
    next(error);
  }
};
