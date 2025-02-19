-- AlterTable
ALTER TABLE `exercise` MODIFY `category` VARCHAR(191) NULL,
    MODIFY `equipment` VARCHAR(191) NULL,
    MODIFY `force` VARCHAR(191) NULL,
    MODIFY `images` VARCHAR(191) NOT NULL,
    MODIFY `instructions` VARCHAR(191) NOT NULL,
    MODIFY `level` VARCHAR(191) NULL,
    MODIFY `primaryMuscles` VARCHAR(191) NOT NULL,
    MODIFY `secondaryMuscles` VARCHAR(191) NOT NULL;
