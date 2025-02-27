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
        const { title, type, description } = req.body;
        const userId = req.user.userId;

        if (!title) {
            return res.status(400).json({ message: "Le titre est obligatoire." });
        }

        const workout = await prisma.workout.create({
            data: { title,type, description, userId },
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
        const { title,type, description } = req.body;
        const userId = req.user.userId;

        const workout = await prisma.workout.findUnique({ where: { id: parseInt(id) } });

        if (!workout || workout.userId !== userId) {
            return res.status(404).json({ message: "Séance non trouvée ou non autorisée." });
        }

        const updatedWorkout = await prisma.workout.update({
            where: { id: parseInt(id) },
            data: { title,type, description },
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

router.post("/:workoutId/exercises", authMiddleware, async (req, res) => {
    const { workoutId } = req.params;
    const { name, imageUrl, apiId ,sets, reps } = req.body;
    const userId = req.user.userId; // ID de l'utilisateur connecté

    try {
        // Vérifier si le workout appartient à l'utilisateur
        const workout = await prisma.workout.findUnique({
            where: { id: Number(workoutId), userId },
        });

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        // Ajouter l'exercice au workout
        const exercise = await prisma.ExerciseOnWorkout.create({
            data: {
                workoutId: Number(workoutId),
                name,
                imageUrl,
                apiId,
                sets,
                reps,
            },
        });

        res.status(201).json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


router.post("/add-exercises", addExercisesToWorkout);

router.get("/:id", async (req, res) => {
    try {
        const workoutId = parseInt(req.params.id);

        const workout = await prisma.workout.findUnique({
            where: { id: workoutId },
            include: {
                exercises: {
                    include: {
                        exercise: true, // Inclure les détails de l'exercice
                    },
                },
            },
        });

        if (!workout) return res.status(404).json({ error: "Workout not found" });

        res.json(workout);
    } catch (error) {
        console.error("Error fetching workout:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/:workoutId/exercises/:exerciseId", async (req, res) => {
    const { workoutId, exerciseId } = req.params;
  const { weight, sets, reps, restTime } = req.body;

  try {
    const updated = await prisma.exerciseOnWorkout.updateMany({
      where: {
        workoutId: Number(workoutId), // Assure que c'est bien un Number
        exerciseId: exerciseId, // Garde la string telle quelle
      },
      data: {
        weight,
        sets,
        reps,
        restTime,
      },
    });

    if (updated.count === 0) {
      return res.status(404).json({ error: "Exercise not found in this workout" });
    }

    res.json({ message: "Exercise updated successfully" });
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
  

router.delete("/:workoutId/exercises/:exerciseId", async (req, res) => {
    const { workoutId, exerciseId } = req.params;

  try {
    const deleted = await prisma.exerciseOnWorkout.deleteMany({
      where: {
        workoutId: Number(workoutId), // Conversion en Number
        exerciseId: exerciseId, // ID sous forme de string
      },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: "Exercise not found in this workout" });
    }

    res.json({ message: "Exercise removed from workout successfully" });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}); 

export default router;
