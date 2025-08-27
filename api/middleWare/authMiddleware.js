import jwt from "jsonwebtoken";
import Admin from "../model/adminModel.js"; // Adjust path as needed

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Accès refusé. Token requis.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Find admin
    const admin = await Admin.findById(decoded.adminId).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Token invalide. Administrateur non trouvé.",
      });
    }

    // Add admin to request
    req.admin = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      createdAt: admin.createdAt,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expiré. Veuillez vous reconnecter.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token invalide.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
    });
  }
};
