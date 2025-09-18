/*
  Warnings:

  - You are about to drop the column `nip_plain` on the `user` table. All the data in the column will be lost.
  - Made the column `nip` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `nip_plain`,
    MODIFY `nip` VARCHAR(191) NOT NULL;
