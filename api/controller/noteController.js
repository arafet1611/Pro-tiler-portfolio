import Note from "../model/noteModel.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js";

// Configure Cloudinary storage for notes
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "notes",
    format: async (req, file) => {
      const format = file.mimetype.split("/")[1];
      return ["jpeg", "jpg", "png", "webp", "gif"].includes(format)
        ? format
        : "jpg";
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `${file.fieldname}-${uniqueSuffix}`;
    },
    transformation: [
      {
        width: 1200,
        height: 800,
        crop: "limit",
        quality: "auto:good",
        fetch_format: "auto",
      },
    ],
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only JPEG, PNG, WebP, and GIF image files are allowed!"),
        false
      );
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10,
  },
});

// Helper function to extract Cloudinary public_id from URL
const extractPublicId = (cloudinaryUrl) => {
  if (!cloudinaryUrl) return null;

  try {
    const urlParts = cloudinaryUrl.split("/");
    const filename = urlParts[urlParts.length - 1];
    const publicIdWithFolder = urlParts
      .slice(-2)
      .join("/")
      .replace(/\.[^/.]+$/, "");
    return publicIdWithFolder;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};

// Helper function to delete image from Cloudinary
const deleteCloudinaryImage = async (imageUrl) => {
  try {
    const publicId = extractPublicId(imageUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted image: ${publicId}`);
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

export const getNotes = async (req, res) => {
  try {
    // Remove all filtering query building logic
    let query = {}; // Empty query to get all notes

    const notes = await Note.find(query).sort({ date: -1 }).lean();

    // Safe date formatting function remains the same
    const formatDate = (dateValue) => {
      if (!dateValue) return "No date";
      try {
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) return "Invalid date";
        return date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Date error";
      }
    };

    const formattedNotes = notes.map((note) => ({
      ...note,
      id: note._id.toString(),
      date: formatDate(note.date),
      createdAt: formatDate(note.createdAt),
    }));

    res.json({
      success: true,
      count: formattedNotes.length,
      data: formattedNotes,
    });
  } catch (error) {
    console.error("Error getting notes:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching notes",
      error: error.message,
    });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
export const getNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Safe date formatting function
    const formatDate = (dateValue) => {
      if (!dateValue) return "No date";

      try {
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) return "Invalid date";

        return date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Date error";
      }
    };

    const formattedNote = {
      ...note.toObject(),
      id: note._id.toString(),
      date: formatDate(note.date),
      createdAt: formatDate(note.createdAt),
    };

    res.json({
      success: true,
      data: formattedNote,
    });
  } catch (error) {
    console.error("Error getting note:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching note",
      error: error.message,
    });
  }
};

// Update all other functions that return notes to use safe date formatting
// Add this helper function at the top of the file
const safeFormatDate = (dateValue) => {
  if (!dateValue) return "No date";

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date error";
  }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req, res) => {
  const now = new Date();

  try {
    const { title, content, priority, date } = req.body;
    console.log("content", content);
    const noteData = {
      title: title || "Untitled Note",
      content: content || [],
      priority: priority || "medium",
      date: date || now,
    };

    const note = await Note.create(noteData);

    const formattedNote = {
      ...note.toObject(),
      id: note._id.toString(),
      date: safeFormatDate(note.date),
    };

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: formattedNote,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(400).json({
      success: false,
      message: "Error creating note",
      error: error.message,
    });
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, priority, date } = req.body;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Update fields if provided
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (priority !== undefined) note.priority = priority;
    if (date !== undefined) note.date = date;

    const updatedNote = await note.save();

    const formattedNote = {
      ...updatedNote.toObject(),
      id: updatedNote._id.toString(),
      date: safeFormatDate(updatedNote.date),
    };

    res.json({
      success: true,
      message: "Note updated successfully",
      data: formattedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(400).json({
      success: false,
      message: "Error updating note",
      error: error.message,
    });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Delete associated images from Cloudinary
    if (note.content && Array.isArray(note.content)) {
      for (const contentBlock of note.content) {
        if (contentBlock.type === "image" && contentBlock.url) {
          await deleteCloudinaryImage(contentBlock.url);
        }
      }
    }

    await Note.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting note",
      error: error.message,
    });
  }
};

// @desc    Add content block to note
// @route   POST /api/notes/:id/content
// @access  Private
export const addContentBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, ...contentData } = req.body;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Add content block
    note.content.push({ type, ...contentData });
    await note.save();

    res.json({
      success: true,
      message: "Content block added successfully",
      data: {
        ...note.toObject(),
        id: note._id.toString(),
        date: safeFormatDate(note.date),
      },
    });
  } catch (error) {
    console.error("Error adding content block:", error);
    res.status(400).json({
      success: false,
      message: "Error adding content block",
      error: error.message,
    });
  }
};

// @desc    Remove content block from note
// @route   DELETE /api/notes/:id/content/:blockIndex
// @access  Private
export const removeContentBlock = async (req, res) => {
  try {
    const { id, blockIndex } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const blockIndexNum = parseInt(blockIndex);

    if (blockIndexNum < 0 || blockIndexNum >= note.content.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid content block index",
      });
    }

    if (
      note.content[blockIndexNum]?.type === "image" &&
      note.content[blockIndexNum]?.url
    ) {
      await deleteCloudinaryImage(note.content[blockIndexNum].url);
    }

    note.content.splice(blockIndexNum, 1);
    await note.save();

    res.json({
      success: true,
      message: "Content block removed successfully",
      data: {
        ...note.toObject(),
        id: note._id.toString(),
        date: safeFormatDate(note.date),
      },
    });
  } catch (error) {
    console.error("Error removing content block:", error);
    res.status(400).json({
      success: false,
      message: "Error removing content block",
      error: error.message,
    });
  }
};

// @desc    Upload image for note
// @route   POST /api/notes/:id/upload-image
// @access  Private
export const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const imageData = {
      type: "image",
      url: req.file.path, // Changed from src to url
      file: req.file,
      caption: req.body.caption || "",
      alt: req.body.alt || "Uploaded image",
    };

    note.content.push(imageData);
    await note.save();

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        imageUrl: req.file.path,
        note: {
          ...note.toObject(),
          id: note._id.toString(),
          date: safeFormatDate(note.date),
        },
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: error.message,
    });
  }
};

export const uploadMultipleImages = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No image files uploaded",
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const uploadedImages = [];
    for (const file of req.files) {
      const imageData = {
        type: "image",
        url: file.path, // Changed from src to url
        file: file,
        caption: "",
        alt: "Uploaded image",
      };

      note.content.push(imageData);
      uploadedImages.push(file.path);
    }

    await note.save();

    res.json({
      success: true,
      message: `${req.files.length} images uploaded successfully`,
      data: {
        imageUrls: uploadedImages,
        note: {
          ...note.toObject(),
          id: note._id.toString(),
          date: safeFormatDate(note.date),
        },
      },
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading images",
      error: error.message,
    });
  }
};

export const updateContentImage = async (req, res) => {
  try {
    const { id, blockIndex } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const blockIndexNum = parseInt(blockIndex);

    if (
      !note.content[blockIndexNum] ||
      note.content[blockIndexNum].type !== "image"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid image block index",
      });
    }

    if (note.content[blockIndexNum].url) {
      await deleteCloudinaryImage(note.content[blockIndexNum].url);
    }

    note.content[blockIndexNum].url = req.file.path; // Changed from src to url
    note.content[blockIndexNum].file = req.file;

    note.content[blockIndexNum].caption =
      req.body.caption || note.content[blockIndexNum].caption || "";
    note.content[blockIndexNum].alt =
      req.body.alt || note.content[blockIndexNum].alt || "Updated image";

    await note.save();

    res.json({
      success: true,
      message: "Image updated successfully",
      data: {
        imageUrl: req.file.path,
        note: {
          ...note.toObject(),
          id: note._id.toString(),
          date: safeFormatDate(note.date),
        },
      },
    });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({
      success: false,
      message: "Error updating image",
      error: error.message,
    });
  }
};
