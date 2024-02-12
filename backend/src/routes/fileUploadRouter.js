// fileUpload Router (multer) + Controller!
import express from "express";
import multer from "multer";
import { doBasicAuth } from "../middleware/doBasicAuth.js";

const fileUploadPath = new URL("../../data/images", import.meta.url).pathname;

const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: fileUploadPath,
    filename: function (_, file, cb) {
      cb(null, `${file.originalname}`);
    },
  }),
});

const fileUploadRouter = express.Router();

fileUploadRouter.post(
  "/upload",
  doBasicAuth, // neu: für BasicAuth
  uploadMiddleware.single("image"),
  function fileUploadCtrl(req, res) {
    try {
      if (!req.file) throw new Error("File must be provided");
      const uploadedFilename = req.file.filename;
      res.json({ success: true, result: { filename: uploadedFilename } });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not upload file",
      });
    }
  }
);

export default fileUploadRouter;
