import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addExercisesToWorkout = async (req, res) => {
    try {
      const { workoutId, exerciseIds } = req.body;
  
      if (!workoutId || !exerciseIds || !Array.isArray(exerciseIds) || exerciseIds.length === 0) {
        return res.status(400).json({ error: "Invalid input. Provide a workoutId and an array of exerciseIds." });
      }
  
      // Vérifier si le workout existe
      const workout = await prisma.workout.findUnique({
        where: { id: workoutId },
      });
  
      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }
  
      // Vérifier si les exercices existent
      const validExercises = await prisma.exercise.findMany({
        where: { id: { in: exerciseIds } },
      });
  
      if (validExercises.length !== exerciseIds.length) {
        return res.status(400).json({ error: "One or more exercises not found" });
      }
  
      // Ajouter les exercices au workout en évitant les doublons
      await prisma.exerciseOnWorkout.createMany({
        data: exerciseIds.map((exerciseId) => ({
          workoutId,
          exerciseId,
        })),
        skipDuplicates: true,
      });
  
      return res.status(200).json({ message: "Exercises successfully added to workout" });
  
    } catch (error) {
      console.error("Error adding exercises to workout:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  