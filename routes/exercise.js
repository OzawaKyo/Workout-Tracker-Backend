import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = express.Router();

// Route pour rechercher des exercices
router.get("/search", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Veuillez fournir un terme de recherche." });

    try {
        const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/name/${query}`, {
            headers: {
                "X-RapidAPI-Key": process.env.EXERCISEDB_API_KEY,
                "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Erreur lors de la récupération des exercices :", error.message);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des exercices." });
    }
});

export default router;
