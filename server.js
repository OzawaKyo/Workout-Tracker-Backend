import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ Import des routes user
import { PrismaClient } from "@prisma/client";
import workoutRoutes from "./routes/workout.js"; // 🔥 Import des routes workouts
import exerciseRoutes from "./routes/exercise.js"; // Importer la nouvelle route
import setupSwagger from "./config/swagger.js"; // Import du fichier Swagger


const prisma = new PrismaClient();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Pour parser le JSON

app.use("/auth", authRoutes); // Routes d'authentification
app.use("/users", userRoutes); // ✅ Ajout des routes users
app.use("/workouts", workoutRoutes); // 🔥 Ajouter les routes workouts
app.use("/exercises", exerciseRoutes);
app.use('/images', express.static('exercises'));
app.use('/pingu',express.static('pingu'));
setupSwagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
