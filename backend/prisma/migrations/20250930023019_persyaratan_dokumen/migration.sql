-- CreateTable
CREATE TABLE `persyaratanDokumen` (
    `persyaratan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_usulan` VARCHAR(10) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `persyaratanDokumen_jenis_usulan_key`(`jenis_usulan`),
    PRIMARY KEY (`persyaratan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
