/*
  Warnings:

  - A unique constraint covering the columns `[usulan_id]` on the table `dokumenSyarat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `is_active` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_active` BOOLEAN NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `registered_at` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `dokumenSyarat_usulan_id_key` ON `dokumenSyarat`(`usulan_id`);
