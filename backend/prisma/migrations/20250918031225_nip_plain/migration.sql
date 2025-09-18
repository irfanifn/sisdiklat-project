/*
  Warnings:

  - You are about to drop the column `password_hash` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `usulan` table. All the data in the column will be lost.
  - You are about to drop the `OPD` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nip]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nama_opd` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip_plain` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `password_hash`,
    DROP COLUMN `username`,
    ADD COLUMN `nama_opd` VARCHAR(255) NOT NULL,
    ADD COLUMN `nip_plain` VARCHAR(50) NOT NULL,
    MODIFY `nip` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usulan` DROP COLUMN `status`;

-- DropTable
DROP TABLE `OPD`;

-- CreateIndex
CREATE UNIQUE INDEX `user_nip_key` ON `user`(`nip`);
