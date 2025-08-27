// models/Message.js
import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  placeAddress: {
    type: String,
    required: true,
    trim: true,
  },
  localisation: {
    type: String,
    required: true,
    enum: [
      "mahdia-city",
      "el-jem",
      "sidi-alouane",
      "chebba",
      "ksour-essef",
      "souassi",
      "other",
    ],
  },
  projectDescription: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  status: {
    type: String,
    enum: ["waiting", "cancelled", "done"],
    default: "waiting",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Message = model("Message", messageSchema);
export default Message;
