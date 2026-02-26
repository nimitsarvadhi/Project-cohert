import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import "./models/User";
import authRoute from "./routes/authRoute";
const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();



app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
  res.send("Backend running successfully! 🚀");
});


sequelize.sync().then(() => {
  console.log("Database synced ✅");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});