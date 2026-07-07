import express from "express";
import multer from "multer";
import { importCSV } from "../controllers/importController.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/", upload.single("file"), importCSV);

export default router;