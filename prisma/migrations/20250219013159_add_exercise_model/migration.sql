/*
  Warnings:

  - You are about to drop the `workoutexercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `workoutexercise` DROP FOREIGN KEY `WorkoutExercise_workoutId_fkey`;

-- DropTable
DROP TABLE `workoutexercise`;

-- CreateTable
CREATE TABLE `Exercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `muscle` VARCHAR(191) NOT NULL,
    `difficulty` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
