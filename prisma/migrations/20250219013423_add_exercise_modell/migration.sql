/*
  Warnings:

  - The primary key for the `exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `exercise` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `exercise` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `exercise` table. All the data in the column will be lost.
  - You are about to drop the column `muscle` on the `exercise` table. All the data in the column will be lost.
  - Added the required column `category` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `force` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryMuscles` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `exercise` DROP PRIMARY KEY,
    DROP COLUMN `description`,
    DROP COLUMN `difficulty`,
    DROP COLUMN `image`,
    DROP COLUMN `muscle`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `equipment` VARCHAR(191) NOT NULL,
    ADD COLUMN `force` VARCHAR(191) NOT NULL,
    ADD COLUMN `images` VARCHAR(191) NOT NULL,
    ADD COLUMN `instructions` VARCHAR(191) NOT NULL,
    ADD COLUMN `level` VARCHAR(191) NOT NULL,
    ADD COLUMN `mechanic` VARCHAR(191) NULL,
    ADD COLUMN `primaryMuscles` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondaryMuscles` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
