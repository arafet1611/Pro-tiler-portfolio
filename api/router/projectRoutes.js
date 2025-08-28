import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getPublicProjects,
  upload,
  updateProjectGallery,
  deleteGalleryItem,
} from "../controller/projectController.js";

const router = express.Router();
router.get("/", getProjects);

// Public routes
router.get("/public", getPublicProjects);
router.get("/:id", getProject);

router.post("/", upload.any(), createProject);

router.post("/", upload.any(), createProject);
router.put("/:id", upload.any(), updateProject);
router.put("/:id", upload.any(), updateProject);
router.put("/:id/gallery", upload.any(), updateProjectGallery);
router.delete("/:projectId/gallery/:itemIndex", deleteGalleryItem);
router.delete("/:id", deleteProject);

export default router;
