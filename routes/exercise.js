import express from "express";
import { getExercises } from "../controllers/exerciseController.js";

const router = express.Router();

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Récupère la liste des exercices
 *     description: Permet de récupérer tous les exercices avec pagination et filtres.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de la page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'exercices par page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Recherche un exercice par nom
 *       - in: query
 *         name: equipment
 *         schema:
 *           type: string
 *         description: Filtrer par type d'équipement
 *       - in: query
 *         name: muscle
 *         schema:
 *           type: string
 *         description: Filtrer par groupe musculaire
 *     responses:
 *       200:
 *         description: Liste des exercices récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "Ab_Crunch_Machine"
 *                       name:
 *                         type: string
 *                         example: "Ab Crunch Machine"
 *                       equipment:
 *                         type: string
 *                         example: "machine"
 *                       primaryMuscles:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["abdominals"]
 *                       secondaryMuscles:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 */
router.get("/", getExercises);

export default router;
