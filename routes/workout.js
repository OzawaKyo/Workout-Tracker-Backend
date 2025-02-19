import express from "express";
import prisma from "../prisma/client.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addExercisesToWorkout } from "../controllers/workoutController.js";

const router = express.Router();

// 1️⃣ Ajouter un workout
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId; // Récupéré depuis le token

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

// 2️⃣ Récupérer tous les workouts de l'utilisateur
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

// 3️⃣ Modifier un workout
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

// 4️⃣ Supprimer un workout
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
    const { name, imageUrl, apiId } = req.body;
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
        const exercise = await prisma.workoutExercise.create({
            data: {
                workoutId: Number(workoutId),
                name,
                imageUrl,
                apiId,
            },
        });

        res.status(201).json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


router.post("/add-exercises", addExercisesToWorkout);


export default router;
