import Admin from "../model/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username
    console.log("POST /api/admin/login body:", req.body); // debug

    // Validate input
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Veuillez fournir un identifiant (email ou nom d'utilisateur) et un mot de passe",
      });
    }

    // Find admin by email or username
    const admin = await Admin.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
    });
    console.log(admin);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Identifiants invalides",
      });
    }
    console.log(password);
    console.log(admin.password.length);

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Identifiants invalides",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
        username: admin.username,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    // Remove password from response
    const adminData = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      createdAt: admin.createdAt,
    };

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      data: {
        admin: adminData,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
    });
  }
};

// Logout Controller
export const logoutAdmin = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Déconnexion réussie",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la déconnexion",
    });
  }
};

// Verify Token Controller
export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token d'accès requis",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    const admin = await Admin.findById(decoded.adminId).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Token invalide",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          createdAt: admin.createdAt,
        },
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({
      success: false,
      message: "Token invalide ou expiré",
    });
  }
};
// Update admin profile
export const updateAdminProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const adminId = req.adminId; // From JWT middleware

    // Validate input
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: "Veuillez fournir un nom d'utilisateur et un email",
      });
    }

    // Check if email is already used by another admin
    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
      _id: { $ne: adminId },
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Cet email est déjà utilisé par un autre administrateur",
      });
    }

    // Update admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { username, email: email.toLowerCase() },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profil modifié avec succès",
      data: { admin: updatedAdmin },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
    });
  }
};

// Change password
export const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.adminId; // From JWT middleware

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Veuillez fournir le mot de passe actuel et le nouveau mot de passe",
      });
    }

    // Find admin
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Administrateur non trouvé",
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Mot de passe actuel incorrect",
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Mot de passe modifié avec succès",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
    });
  }
};
