import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/log-out", logoutUser);
export default router;
