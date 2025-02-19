import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const EXERCISE_API_URL = "https://api.api-ninjas.com/v1/exercises"; // API externe
const API_KEY = process.env.EXERCISE_API_KEY; // Clé API stockée dans .env

// Route GET /exercises pour rechercher des exercices
router.get("/", async (req, res) => {
    const { name, muscle } = req.query;
  
    try {
      const response = await axios.get(EXERCISE_API_URL, {
        headers: { "X-Api-Key": API_KEY },
        params: { name, muscle },
      });
  
      res.json(response.data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      res.status(500).json({ message: "Erreur lors de la récupération des exercices", error: error.response?.data || error.message });
    }
  });
  

export default router;
