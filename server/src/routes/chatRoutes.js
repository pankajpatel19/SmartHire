import { Router } from "express";
import { getChatResponse } from "../controller/chatController.js";

const router = Router();

router.post("/query", getChatResponse);

export default router;
