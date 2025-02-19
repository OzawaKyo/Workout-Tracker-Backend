import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function importExercises() {
  try {
    // Charger le fichier JSON
    const rawData = fs.readFileSync("exercises.json");
    const exercisesData = JSON.parse(rawData);

    // Transformer les données pour Prisma
    const exercises = exercisesData.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      force: exercise.force || null,
      level: exercise.level || null,
      mechanic: exercise.mechanic || null,
      equipment: exercise.equipment || null,
      primaryMuscles: JSON.stringify(exercise.primaryMuscles || []),
      secondaryMuscles: JSON.stringify(exercise.secondaryMuscles || []),
      instructions: JSON.stringify(exercise.instructions || []),
      category: exercise.category || null,
      images: JSON.stringify(exercise.images || []),
    }));

    // Insérer en base de données
    await prisma.exercise.createMany({ data: exercises });

    console.log("✅ Importation terminée !");
  } catch (error) {
    console.error("❌ Erreur lors de l'importation :", error);
  } finally {
    await prisma.$disconnect();
  }
}

importExercises();
