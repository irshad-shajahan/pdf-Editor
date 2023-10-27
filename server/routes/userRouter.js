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
//register route
router.post('/register',register)
//login-route
router.post('/login',login)
//pdf processing route
router.post("/upload-pdf", upload.single("pdf"), processPdf);
//downlaoad pdf route
router.get("/download-pdf/:fileName", downloadPdf);
//route to fetch user details
router.get('/getUserData',authenticateMiddleware,authController)


export default router;
