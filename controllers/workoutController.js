import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addExercisesToWorkout = async (req, res) => {
    try {
      const { workoutId, exercises } = req.body;
  
      if (!workoutId || !exercises || !Array.isArray(exercises) || exercises.length === 0) {
        return res.status(400).json({ error: "Invalid input. Provide a workoutId and an array of exercises." });
      }
  
      // Vérifier si le workout existe
      const workout = await prisma.workout.findUnique({ where: { id: workoutId } });
      if (!workout) return res.status(404).json({ error: "Workout not found" });
  
      // Vérifier si tous les exercices existent
      const exerciseIds = exercises.map((e) => e.exerciseId);
      const validExercises = await prisma.exercise.findMany({
        where: { id: { in: exerciseIds } },
      });
  
      if (validExercises.length !== exerciseIds.length) {
        return res.status(400).json({ error: "One or more exercises not found" });
      }
  
      // Ajouter les exercices au workout avec détails
      await prisma.exerciseOnWorkout.createMany({
        data: exercises.map(({ exerciseId, weight, sets, reps, restTime }) => ({
          workoutId,
          exerciseId,
          weight: weight || null,
          sets,
          reps,
          restTime: restTime || null,
        })),
        skipDuplicates: true,
      });
  
      return res.status(200).json({ message: "Exercises successfully added to workout" });
  
    } catch (error) {
      console.error("Error adding exercises to workout:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  