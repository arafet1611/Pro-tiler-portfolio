// controllers/messageController.js
import Message from "../model/messageModel.js";
import nodemailer from "nodemailer";

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // or 587 with secure: false
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: verify connection on startup
transporter
  .verify()
  .then(() => console.log("Mailer ready"))
  .catch(console.error);

const messageController = {
  // Create new message and send email
  createMessage: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        phone,
        placeAddress,
        localisation,
        projectDescription,
        email,
      } = req.body;

      // Validate required fields
      if (
        !firstName ||
        !lastName ||
        !phone ||
        !placeAddress ||
        !localisation ||
        !projectDescription ||
        !email
      ) {
        return res.status(400).json({
          success: false,
          message: "Tous les champs obligatoires doivent être remplis",
        });
      }

      // Create new message in database
      const newMessage = new Message({
        firstName,
        lastName,
        phone,
        placeAddress,
        localisation,
        projectDescription,
        email,
      });

      const savedMessage = await newMessage.save();

      // Send email notification
      const mailOptions = {
        from: "Meilleur Carreleur de Luxe",
        replyTo: email,
        to: process.env.EMAIL_USER,
        subject: `Nouveau message de contact - ${firstName} ${lastName}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom complet:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Lieu du projet:</strong> ${placeAddress}</p>
          <p><strong>Localisation:</strong> ${localisation}</p>
          <p><strong>Description du projet:</strong></p>
          <p>${projectDescription}</p>
          <br>
          <p><em>Message reçu le: ${new Date().toLocaleString("fr-FR")}</em></p>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      // Send confirmation email to user
      const userMailOptions = {
        from: "Meilleur Carreleur de Luxe",
        to: email,
        subject:
          "Confirmation de réception - Votre projet avec Meilleur Carreleur de Luxe",
        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          Importance: "high",
        },
        html: `
    <h2>Merci pour votre message !</h2>
    <p>Cher(e) ${firstName},</p>
    <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.</p>
    <p>Notre équipe prendra contact avec vous dans les plus brefs délais au numéro ${phone}.</p>
    <br>
    <br>
    <p>Cordialement,<br>L'équipe Meilleur Carreleur de Luxe</p>
    <p>Email: username@exemple.com<br>Téléphone: +216 20 123 456</p>
  `,
      };

      await transporter.sendMail(userMailOptions);

      res.status(201).json({
        success: true,
        message: "Message envoyé avec succès",
        data: savedMessage,
      });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de l'envoi du message",
        error: error.message,
      });
    }
  },

  // Get all messages
  getMessages: async (req, res) => {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des messages",
        error: error.message,
      });
    }
  },

  updateMessageStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const message = await Message.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );

      if (!message) {
        return res.status(404).json({
          success: false,
          message: "Message non trouvé",
        });
      }

      res.status(200).json({
        success: true,
        data: message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour du message",
        error: error.message,
      });
    }
  },
};

export default messageController;
