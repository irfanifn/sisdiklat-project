import { prisma } from "../configs/utils.js";

const getAllPengajuan = async (req, res) => {
  try {
    const pengajuans = await prisma.usulan.findMany({
      include: {
        user: {
          select: {
            nama: true,
            nip: true,
            email: true,
            jabatan: true,
            nama_opd: true,
          },
        },
        dokumenSyarat: true,
        riwayatStatus: {
          orderBy: { tanggal_perubahan: "desc" },
          take: 1,
        },
      },
      orderBy: { tanggal_pengajuan: "desc" },
    });

    res.status(200).json({
      success: true,
      data: pengajuans,
      message: "Data pengajuan berhasil diambil",
    });
  } catch (err) {
    console.error("Error getting all pengajuan:", err);
    res.status(500).json({
      seccess: false,
      data: null,
      message: err.message,
      status: "Error",
    });
  }
};

const getAllRiwayatStatus = async (req, res) => {
  try {
    const riwayatStatus = await prisma.riwayatStatus.findMany({
      include: {
        usulan: {
          include: {
            user: {
              select: {
                nama: true,
                nip: true,
              },
            },
          },
        },
      },
      orderBy: { tanggal_perubahan: "desc" },
    });

    res.status(200).json({
      success: true,
      data: riwayatStatus,
      message: "Data riwayat status berhasil diambil",
    });
  } catch (err) {
    console.error("Error getting all riwayat status:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
      status: "Error",
    });
  }
};

const approvePengajuan = async (req, res) => {
  const { id } = req.params;
  const UserId = req.user.user_id;

  try {
    // Cek apakah usulan ada
    const usulan = await prisma.usulan.findUnique({
      where: { usulan_id: parseInt(id) },
    });

    if (!usulan) {
      return res.status(404).json({
        success: false,
        message: "Usulan tidak ditemukan",
      });
    }

    // Buat riwayat status baru untuk approve
    await prisma.riwayatStatus.create({
      data: {
        usulan_id: parseInt(id),
        status: "disetujui",
        catatan: "Usulan telah disetujui setelah verifikasi dokumen",
        tanggal_perubahan: new Date(),
      },
    });

    // Update status dokumen juga kalau ada
    await prisma.dokumenSyarat.updateMany({
      where: { usulan_id: parseInt(id) },
      data: { status_verifikasi: "verified" },
    });

    res.status(200).json({
      success: true,
      message: "Usulan berhasil disetujui",
    });
  } catch (err) {
    console.error("Error approving usulan:", err);
    res.status(500).json({
      success: false,
      message: err.message,
      status: "Error",
    });
  }
};

const rejectPengajuan = async (req, res) => {
  const { id } = req.params;
  const { catatan } = req.body;
  const adminUserId = req.user.user_id;

  try {
    // Validasi catatan harus ada
    if (!catatan || !catatan.trim()) {
      return res.status(400).json({
        success: false,
        message: "Catatan penolakan harus diisi",
      });
    }

    // Cek apakah usulan ada
    const usulan = await prisma.usulan.findUnique({
      where: { usulan_id: parseInt(id) },
    });

    if (!usulan) {
      return res.status(404).json({
        success: false,
        message: "Usulan tidak ditemukan",
      });
    }

    // Buat riwayat status baru untuk reject
    await prisma.riwayatStatus.create({
      data: {
        usulan_id: parseInt(id),
        status: "ditolak",
        catatan: catatan.trim(),
        tanggal_perubahan: new Date(),
      },
    });

    // Update status dokumen juga kalau ada
    await prisma.dokumenSyarat.updateMany({
      where: { usulan_id: parseInt(id) },
      data: { status_verifikasi: "rejected" },
    });

    res.status(200).json({
      success: true,
      message: "Usulan berhasil ditolak",
    });
  } catch (err) {
    console.error("Error rejecting usulan:", err);
    res.status(500).json({
      success: false,
      message: err.message,
      status: "Error",
    });
  }
};

export {
  getAllPengajuan,
  getAllRiwayatStatus,
  approvePengajuan,
  rejectPengajuan,
};
