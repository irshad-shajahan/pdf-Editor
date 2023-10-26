import express from "express";
const router = express.Router();
import {
  authController,
  downloadPdf,
  login,
  processPdf,
  register,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import authenticateMiddleware from "../middlewares/authMiddleware.js";





router.post('/register',register)
router.post('/login',login)
router.post("/upload-pdf", upload.single("pdf"), processPdf);
router.get("/download-pdf/:fileName", downloadPdf);
router.get('/getUserData',authenticateMiddleware,authController)


export default router;
