import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './router/users.js';
import videoRouter from './router/videos.js';
import commentRouter from './router/comments.js';
import authRouter from './router/auth.js';

const app = express();

dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log(err));
};

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/videos", videoRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Error occurred...";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Server's running on port:8000...");
});