-- CreateTable
CREATE TABLE `ExerciseOnWorkout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workoutId` INTEGER NOT NULL,
    `exerciseId` VARCHAR(191) NOT NULL,
    `weight` DOUBLE NULL,
    `sets` INTEGER NOT NULL,
    `reps` INTEGER NOT NULL,
    `restTime` INTEGER NULL,

    UNIQUE INDEX `ExerciseOnWorkout_workoutId_exerciseId_key`(`workoutId`, `exerciseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExerciseOnWorkout` ADD CONSTRAINT `ExerciseOnWorkout_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseOnWorkout` ADD CONSTRAINT `ExerciseOnWorkout_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
