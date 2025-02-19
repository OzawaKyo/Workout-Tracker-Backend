/*
  Warnings:

  - You are about to drop the `exerciseonworkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `exerciseonworkout` DROP FOREIGN KEY `ExerciseOnWorkout_exerciseId_fkey`;

-- DropForeignKey
ALTER TABLE `exerciseonworkout` DROP FOREIGN KEY `ExerciseOnWorkout_workoutId_fkey`;

-- DropTable
DROP TABLE `exerciseonworkout`;
