-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(50) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `jabatan` VARCHAR(100) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OPD` (
    `opd_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_opd` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`opd_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usulan` (
    `usulan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `jenis_usulan` VARCHAR(100) NOT NULL,
    `tanggal_pengajuan` DATE NOT NULL,
    `status` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`usulan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumenSyarat` (
    `dok_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usulan_id` INTEGER NOT NULL,
    `nama_file` VARCHAR(255) NOT NULL,
    `path_file` VARCHAR(255) NOT NULL,
    `status_verifikasi` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`dok_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riwayatStatus` (
    `riwayat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usulan_id` INTEGER NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `catatan` VARCHAR(255) NOT NULL,
    `tanggal_perubahan` DATE NOT NULL,

    PRIMARY KEY (`riwayat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usulan` ADD CONSTRAINT `usulan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumenSyarat` ADD CONSTRAINT `dokumenSyarat_usulan_id_fkey` FOREIGN KEY (`usulan_id`) REFERENCES `usulan`(`usulan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `riwayatStatus` ADD CONSTRAINT `riwayatStatus_usulan_id_fkey` FOREIGN KEY (`usulan_id`) REFERENCES `usulan`(`usulan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
