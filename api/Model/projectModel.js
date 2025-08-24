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

    mainImage: {
      type: String,
      required: true,
    },
    beforeAndAfterGallery: {
      type: [
        {
          beforeImage: { type: String, required: true },
          afterImage: { type: String, required: true },
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
