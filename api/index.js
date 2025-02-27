import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

//? Routes:
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

//? MiddleWare For Error Handling:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
