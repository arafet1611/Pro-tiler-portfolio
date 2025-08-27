// routes/messageRoutes.js
import express from "express";
import messageController from "../controller/meessageControle.js";

const router = express.Router();

// Create new message
router.post("/", messageController.createMessage);

// Get all messages
router.get("/", messageController.getMessages);

// Update message status
router.put("/:id/status", messageController.updateMessageStatus);

// Delete message

export default router;
