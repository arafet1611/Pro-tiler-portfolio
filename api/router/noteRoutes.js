// In your routes file (e.g., routes/notes.js)
import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  uploadImage,
  uploadMultipleImages,
  addContentBlock,
  removeContentBlock,
  updateContentImage,
} from "../controller/noteController.js";
import { upload } from "../controller/noteController.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

// Image upload routes
router.post("/:id/upload-image", upload.single("image"), uploadImage);
router.post(
  "/:id/upload-images",
  upload.array("images", 10),
  uploadMultipleImages
);

// Content block routes
router.post("/:id/content", addContentBlock);
router.delete("/:id/content/:blockIndex", removeContentBlock);
router.put(
  "/:id/content/:blockIndex/image",
  upload.single("image"),
  updateContentImage
);

export default router;
