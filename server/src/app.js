import express from "express";
import resumeRoutes from "./routes/resumeRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/resume", resumeRoutes);
app.use("/api/chat", chatRoutes);

export default app;
