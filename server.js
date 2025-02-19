import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ Import des routes user
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Pour parser le JSON

app.use("/auth", authRoutes); // Routes d'authentification
app.use("/users", userRoutes); // ✅ Ajout des routes users

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
