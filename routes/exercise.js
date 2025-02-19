import express from "express";
import { getExercises } from "../controllers/exerciseController.js";

const router = express.Router();

// Route pour récupérer les exercices avec filtres
router.get("/", getExercises);

export default router;
