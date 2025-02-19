/*
  Warnings:

  - You are about to alter the column `images` on the `exercise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `instructions` on the `exercise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `primaryMuscles` on the `exercise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - A unique constraint covering the columns `[id]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - Made the column `secondaryMuscles` on table `exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `exercise` MODIFY `images` JSON NOT NULL,
    MODIFY `instructions` JSON NOT NULL,
    MODIFY `primaryMuscles` JSON NOT NULL,
    MODIFY `secondaryMuscles` JSON NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Exercise_id_key` ON `Exercise`(`id`);
