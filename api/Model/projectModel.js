import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    mainImage: {
      type: String,
      required: true,
    },
    beforeAndAfterGallery: {
      type: [
        {
          beforeImage: { type: String, required: true },
          afterImage: { type: String, required: true },
          caption: { type: String },
        },
      ],
      default: [],
    },
    date: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
