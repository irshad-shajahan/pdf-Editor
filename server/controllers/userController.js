import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { dirname } from "path";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { userModel } from "../models/userModel.js";
import { log } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

//register function
export const register = async (req, res) => {
  const data = req.body;
  try {
    const password = data.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    data.password = hashedPassword;
    const newUser = new userModel(data);
    await newUser.save();
    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `register controller ${error.message}`,
    });
  }
};

//login function
export const login = async (req, res) => {
  const data = req.body;
  try {
    const user = await userModel.findOne({ email: data.email });
    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: `Invalid Email or Password`, success: false });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        message: `Login Succesful`,
        success: true,
        token,
      });
    }else{
      return res
          .status(200)
          .send({ message: `Invalid Email or Password`, success: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in Login Control ${error.message}` });
  }
};

// process pdf to only select and save the selected pages only and send the filename to the client
export const processPdf = async (req, res) => {
  try {
    let userId = req.body?.userId    
    const fileOriginalName = req.file.originalname;
    const pages = JSON.parse(req.body.selectedPages).sort();
    const pdfBuffer = req.file.buffer;
    const pdfFile = await PDFDocument.load(pdfBuffer);
    const pdfDoc = await PDFDocument.create();
    const copiedPages = await pdfDoc.copyPages(pdfFile, pages);
    copiedPages.forEach((e) => {
      pdfDoc.addPage(e);
    });
    const pdfBytes = await pdfDoc.save();
    const saveDirectory = "./public/generatedpdf";
    const randomString = Math.random().toString(36).substring(2); // Generate a random string
    const fileName = fileOriginalName + "&--&" + randomString + ".pdf";
   if(userId){
    const user = await userModel.findById(userId)
    const newDocument = {
      name: fileName,
    };
    user.documents.push(newDocument)
    await user.save()
   }
    const filePath = path.join(saveDirectory, fileName);
    try {
      await fs.mkdir(saveDirectory, { recursive: true });
      await fs.writeFile(filePath, pdfBytes);
      console.log("PDF saved to", filePath);
    } catch (err) {
      console.error("Error saving PDF:", err);
    }
    res
      .status(200)
      .send({ msg: "The pdf is modified succefully", success: true, fileName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

//api called to download the saved pdf
export const downloadPdf = (req, res) => {
  const filename = req.params.fileName;
  const filePath = path.join(__dirname, "../generatedpdf", filename);
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "application/pdf");
  res.sendFile(filePath);
};

//authentication controller
export const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};
