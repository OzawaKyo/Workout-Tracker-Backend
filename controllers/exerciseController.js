import prisma from "../prisma/client.js";

const getExercises = async (req, res) => {
    try {
        const { page = 1, limit = 10, name, equipment, muscle } = req.query;

        const skip = (page - 1) * limit;
        const take = parseInt(limit);

        const where = {};

        if (name) {
            where.name = { contains: name, mode: 'insensitive' };
        }
        if (equipment) {
            where.equipment = { equals: equipment, mode: 'insensitive' };
        }
        if (muscle) {
            where.OR = [
                { primaryMuscles: { has: muscle } },
                { secondaryMuscles: { has: muscle } }
            ];
        }

        const exercises = await prisma.exercise.findMany({
            where,
            skip,
            take
        });

        const totalExercises = await prisma.exercise.count({ where });

        res.json({
            total: totalExercises,
            page: parseInt(page),
            limit: take,
            totalPages: Math.ceil(totalExercises / take),
            data: exercises
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des exercices :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des exercices" });
    }
};

  
  
  
    export { getExercises };