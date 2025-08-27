import { Router } from "express";
import {
  loginAdmin,
  logoutAdmin,
  verifyToken,
  updateAdminProfile,
  changeAdminPassword,
} from "../controller/adminController.js";
import { authMiddleware } from "../middleWare/authMiddleware.js";
const router = Router();
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/verifyToken", verifyToken)
router.put("/profile", authMiddleware, updateAdminProfile);
router.post("/change-password", authMiddleware, changeAdminPassword);
export default router;
