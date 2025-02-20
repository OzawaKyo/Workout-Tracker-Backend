import express from "express";
import prisma from "../prisma/client.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addExercisesToWorkout } from "../controllers/workoutController.js";

const router = express.Router();

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Ajouter un workout
 *     description: Crée un nouveau workout pour l'utilisateur connecté.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Workout créé avec succès
 *       400:
 *         description: Le titre est obligatoire
 *       500:
 *         description: Erreur serveur
 */
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId;

        if (!title) {
            return res.status(400).json({ message: "Le titre est obligatoire." });
        }

        const workout = await prisma.workout.create({
            data: { title, description, userId },
        });

        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Récupérer tous les workouts de l'utilisateur
 *     description: Retourne tous les workouts créés par l'utilisateur connecté.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des workouts retournée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;

        const workouts = await prisma.workout.findMany({
            where: { userId },
            orderBy: { date: "desc" },
        });

        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     summary: Modifier un workout
 *     description: Met à jour un workout existant appartenant à l'utilisateur connecté.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du workout à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Workout mis à jour avec succès
 *       404:
 *         description: Workout non trouvé ou non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.user.userId;

        const workout = await prisma.workout.findUnique({ where: { id: parseInt(id) } });

        if (!workout || workout.userId !== userId) {
            return res.status(404).json({ message: "Séance non trouvée ou non autorisée." });
        }

        const updatedWorkout = await prisma.workout.update({
            where: { id: parseInt(id) },
            data: { title, description },
        });

        res.json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Supprimer un workout
 *     description: Supprime un workout appartenant à l'utilisateur connecté.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du workout à supprimer
 *     responses:
 *       200:
 *         description: Workout supprimé avec succès
 *       404:
 *         description: Workout non trouvé ou non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const workout = await prisma.workout.findUnique({ where: { id: parseInt(id) } });

        if (!workout || workout.userId !== userId) {
            return res.status(404).json({ message: "Séance non trouvée ou non autorisée." });
        }

        await prisma.workout.delete({ where: { id: parseInt(id) } });

        res.json({ message: "Séance supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

export default router;
