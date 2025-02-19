import prisma from "../prisma/client.js";

export const getExercises = async (req, res) => {
    try {
        const { name, muscle, equipment } = req.query;

        const filters = {};
        if (name) {
            filters.name = { contains: name, mode: "insensitive" };
        }
        if (muscle) {
            filters.OR = [
                { primaryMuscles: { has: muscle } },
                { secondaryMuscles: { has: muscle } }
            ];
        }
        if (equipment) {
            filters.equipment = equipment;
        }

        const exercises = await prisma.exercise.findMany({ where: filters });
        res.json(exercises);
    } catch (error) {
        console.error("Erreur lors de la récupération des exercices :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des exercices" });
    }
};
