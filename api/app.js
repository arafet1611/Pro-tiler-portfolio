// server.js (ou index.js, app.js — le fichier que tu as partagé)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./configs/db.js";
import ProjectRoutes from "./router/projectRoutes.js";
import MessageRoutes from "./router/messageRoutes.js";
import NoteRoutes from "./router/noteRoutes.js";
import AdminRoutes from "./router/adminRoutes.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./model/adminModel.js"; // <-- vérifie le bon chemin
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cors());

/**
 * Fonction qui crée l'admin par défaut une seule fois
 */
/**
 * Fonction qui crée l'admin par défaut une seule fois
 */
const createDefaultAdminIfNotExists = async () => {
  try {
    // Check if admin already exists
    const existing = await Admin.findOne({
      $or: [{ email: "admin@carrelage.com" }, { username: "admin_carrelage" }],
    });

    if (existing) {
      console.log(
        "Default admin already exists:",
        existing.email || existing.username
      );
      return;
    }

    // Use a password that respects schema minlength (>=6)
    const defaultPassword = "admin123"; // plain password, will be hashed automatically

    const newAdmin = new Admin({
      username: "admin_carrelage",
      email: "admin@carrelage.com",
      password: defaultPassword, // plain password -> pre-save hook hashes it
      createdAt: new Date("2024-01-15T10:30:00.000Z"),
      lastLogin: new Date("2025-01-20T14:22:00.000Z"),
      isActive: true,
    });

    await newAdmin.save();
    console.log("Default admin created:", newAdmin.email);
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
};


const startServer = async () => {
  await connectDB(); // connect to MongoDB
  await createDefaultAdminIfNotExists(); // create admin once
  app.listen(PORT, (error) => {
    if (!error) console.log("Server is running on port " + PORT);
    else console.log("Error occurred, server can't start", error);
  });
};

startServer();

app.use("/api/projects", ProjectRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/notes", NoteRoutes);
app.use("/api/admin", AdminRoutes);
