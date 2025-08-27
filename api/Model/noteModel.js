import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: [
      {
        type: {
          type: String,
          enum: ["text", "image", "list", "title"],
          required: true,
        },
        text: {
          type: String,
          default: "",
        },
        title: {
          type: String,
          default: "",
        },
        headingLevel: {
          type: String,
          enum: ["h1", "h2", "h3"],
          default: "h2",
        },
        url: {
          type: String,
          default: "",
        },
        file: {
          type: Object,
          default: null,
        },
        items: [
          {
            type: String,
            default: "",
          },
        ],
        listType: {
          type: String,
          enum: ["bullet", "numbered"],
          default: "bullet",
        },
        bold: {
          type: Boolean,
          default: false,
        },
        italic: {
          type: Boolean,
          default: false,
        },
        align: {
          type: String,
          enum: ["left", "center", "right"],
          default: "left",
        },
      },
    ],
    date: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);
