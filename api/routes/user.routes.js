import express from "express";
import {
  isAdminRoute,
  protectedRoute,
} from "../middlewares/auth.middleware.js";
import { getTeamList } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-team", protectedRoute, isAdminRoute, getTeamList);

export default router;
