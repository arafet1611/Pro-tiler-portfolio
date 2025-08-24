import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./configs/db.js";
import ProjectRoutes from "./router/projectRoutes.js";
import dotenv from "dotenv";
dotenv.config();

connectDB();
const app = express();
const PORT = 3000;
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json());

app.use(cors());

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,  and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
app.use("/api/projects", ProjectRoutes);
