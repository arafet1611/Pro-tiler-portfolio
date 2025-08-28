import Project from "../model/projectModel.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js"; // You'll need to set up Cloudinary config

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "notes",
    format: async (req, file) => {
      // Determine format based on file mimetype
      const format = file.mimetype.split("/")[1];
      return format;
    },
    public_id: (req, file) => {
      // Generate unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return file.fieldname + "-" + uniqueSuffix;
    },
    transformation: [
      { width: 1200, height: 800, crop: "limit", quality: "auto" },
    ],
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const createProject = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Find main image
    const mainImageFile = req.files.find(
      (file) => file.fieldname === "mainImage"
    );
    if (!mainImageFile) {
      return res.status(400).json({ error: "Main image is required" });
    }

    const mainImage = mainImageFile.path;

    // Process before/after gallery
    const beforeAndAfterGallery = [];

    // Group files by their index
    const galleryFiles = {};

    req.files.forEach((file) => {
      if (
        file.fieldname.startsWith("beforeImage") ||
        file.fieldname.startsWith("afterImage")
      ) {
        // Extract index from fieldname (e.g., "beforeImage0" -> index 0)
        const index = parseInt(file.fieldname.replace(/\D/g, ""));
        const type = file.fieldname.replace(/\d/g, ""); // "beforeImage" or "afterImage"

        if (!galleryFiles[index]) {
          galleryFiles[index] = {};
        }

        galleryFiles[index][type] = file.path;
      }
    });

    // Create gallery items from grouped files
    Object.keys(galleryFiles).forEach((index) => {
      const item = galleryFiles[index];
      if (item.beforeImage && item.afterImage) {
        beforeAndAfterGallery.push({
          beforeImage: item.beforeImage,
          afterImage: item.afterImage,
        });
      }
    });

    const project = new Project({
      title,
      description,
      location,
      date,
      mainImage,
      beforeAndAfterGallery,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Project.countDocuments();
    console.log(projects);
    res.json({
      projects,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single project
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    const updateData = { title, description, location, date };

    // Handle main image update if provided
    const mainImageFile = req.files.find(
      (file) => file.fieldname === "mainImage"
    );
    if (mainImageFile) {
      // Delete old main image from Cloudinary if exists
      const oldProject = await Project.findById(req.params.id);
      if (oldProject && oldProject.mainImage) {
        // Extract public_id from Cloudinary URL
        const publicId = oldProject.mainImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`projects/${publicId}`);
      }
      updateData.mainImage = mainImageFile.path;
    }

    // Handle gallery updates if provided
    if (
      req.files.some(
        (file) =>
          file.fieldname.startsWith("beforeImage") ||
          file.fieldname.startsWith("afterImage")
      )
    ) {
      // Group files by their index
      const galleryFiles = {};

      req.files.forEach((file) => {
        if (
          file.fieldname.startsWith("beforeImage") ||
          file.fieldname.startsWith("afterImage")
        ) {
          const index = parseInt(file.fieldname.replace(/\D/g, ""));
          const type = file.fieldname.replace(/\d/g, "");

          if (!galleryFiles[index]) {
            galleryFiles[index] = {};
          }

          galleryFiles[index][type] = file.path;
        }
      });

      const beforeAndAfterGallery = [];
      Object.keys(galleryFiles).forEach((index) => {
        const item = galleryFiles[index];
        if (item.beforeImage && item.afterImage) {
          beforeAndAfterGallery.push({
            beforeImage: item.beforeImage,
            afterImage: item.afterImage,
          });
        }
      });

      // Delete old gallery images from Cloudinary
      const oldProject = await Project.findById(req.params.id);
      if (oldProject && oldProject.beforeAndAfterGallery) {
        for (const item of oldProject.beforeAndAfterGallery) {
          if (item.beforeImage) {
            const publicId = item.beforeImage.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`projects/${publicId}`);
          }
          if (item.afterImage) {
            const publicId = item.afterImage.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`projects/${publicId}`);
          }
        }
      }

      updateData.beforeAndAfterGallery = beforeAndAfterGallery;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Delete associated images from Cloudinary
    if (project.mainImage) {
      const publicId = project.mainImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`projects/${publicId}`);
    }

    if (project.beforeAndAfterGallery) {
      for (const item of project.beforeAndAfterGallery) {
        if (item.beforeImage) {
          const publicId = item.beforeImage.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`projects/${publicId}`);
        }
        if (item.afterImage) {
          const publicId = item.afterImage.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`projects/${publicId}`);
        }
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get projects with pagination for public access
// Get public projects with gallery
export const getPublicProjects = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    
    const projects = await Project.find()
      .select('title description location mainImage date beforeAndAfterGallery')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Ensure gallery exists
    const projectsWithGallery = projects.map(project => ({
      ...project,
      beforeAndAfterGallery: project.beforeAndAfterGallery || []
    }));

    const total = await Project.countDocuments();
    
    res.json({
      projects: projectsWithGallery,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update project gallery
export const updateProjectGallery = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find the existing project
    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Start with the existing gallery items
    let beforeAndAfterGallery = [...existingProject.beforeAndAfterGallery];

    if (req.files && req.files.length > 0) {
      // Group new files by their index
      const galleryFiles = {};

      req.files.forEach((file) => {
        // Extract index and type from fieldname (e.g., "beforeImage0" -> index 0, type "beforeImage")
        const fieldMatch = file.fieldname.match(
          /(beforeImage|afterImage)(\d+)/
        );
        if (fieldMatch) {
          const type = fieldMatch[1]; // "beforeImage" or "afterImage"
          const index = parseInt(fieldMatch[2]); // index number

          if (!galleryFiles[index]) {
            galleryFiles[index] = {};
          }

          galleryFiles[index][type] = file.path;
        }
      });

      // Create new gallery items from grouped files and append them
      Object.keys(galleryFiles).forEach((index) => {
        const item = galleryFiles[index];
        if (item.beforeImage && item.afterImage) {
          beforeAndAfterGallery.push({
            beforeImage: item.beforeImage,
            afterImage: item.afterImage,
          });
        }
      });
    }

    // Update the project with the combined gallery (existing + new)
    const project = await Project.findByIdAndUpdate(
      projectId,
      { beforeAndAfterGallery },
      { new: true, runValidators: true }
    );

    res.json(project);
  } catch (error) {
    console.error("Error updating project gallery:", error);
    res.status(400).json({ error: error.message });
  }
};

// Delete specific gallery item
export const deleteGalleryItem = async (req, res) => {
  try {
    const { projectId, itemIndex } = req.params;
    const index = parseInt(itemIndex);

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (
      !project.beforeAndAfterGallery ||
      index >= project.beforeAndAfterGallery.length
    ) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    // Get the item to delete for image cleanup
    const itemToDelete = project.beforeAndAfterGallery[index];

    // Delete images from Cloudinary
    if (itemToDelete.beforeImage) {
      const publicId = itemToDelete.beforeImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`projects/${publicId}`);
    }
    if (itemToDelete.afterImage) {
      const publicId = itemToDelete.afterImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`projects/${publicId}`);
    }

    // Remove the item from the gallery array
    project.beforeAndAfterGallery.splice(index, 1);

    // Save the updated project
    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    res.status(400).json({ error: error.message });
  }
};
