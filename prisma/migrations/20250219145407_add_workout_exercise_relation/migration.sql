-- AlterTable
ALTER TABLE `exercise` MODIFY `images` TEXT NOT NULL,
    MODIFY `instructions` TEXT NOT NULL,
    MODIFY `primaryMuscles` TEXT NOT NULL,
    MODIFY `secondaryMuscles` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `WorkoutExercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workoutId` INTEGER NOT NULL,
    `exerciseId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `WorkoutExercise_workoutId_exerciseId_key`(`workoutId`, `exerciseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkoutExercise` ADD CONSTRAINT `WorkoutExercise_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutExercise` ADD CONSTRAINT `WorkoutExercise_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
