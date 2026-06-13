import { Router } from "express";
import { UploadResume } from "../controller/recruitmentController.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/upload-resume", upload.single("resume"), UploadResume);
export default router;
