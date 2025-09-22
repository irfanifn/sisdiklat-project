import { prisma } from "../configs/utils.js";

const createUsulan = async (req, res) => {
  const user_id = req.user.user_id;
  const { jenisUsulan, tanggalPengajuan } = req.body;

  try {
    const newUsulan = await prisma.usulan.create({
      data: {
        user_id: parseInt(user_id),
        jenis_usulan: jenisUsulan,
        tanggal_pengajuan: new Date(tanggalPengajuan),
      },
    });

    await prisma.riwayatStatus.create({
      data: {
        usulan_id: newUsulan.usulan_id,
        status: "pending",
        catatan: "Usulan baru disubmit, menunggu verifikasi",
        tanggal_perubahan: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      data: newUsulan,
      message: "Usulan berhasil disubmit",
    });
  } catch (err) {
    console.error("Error creating usulan:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
      status: "Error",
    });
  }
};

const getUserUsulans = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const usulans = await prisma.usulan.findMany({
      where: { user_id: parseInt(user_id) },
      include: {
        dokumenSyarat: true,
        riwayatStatus: {
          orderBy: { tanggal_perubahan: "desc" },
          take: 1, // Ambil status terbaru saja
        },
      },
      orderBy: { tanggal_pengajuan: "desc" },
    });

    res.status(200).json({
      success: true,
      data: usulans,
      message: "Data usulan berhasil diambil",
    });
  } catch (err) {
    console.error("Error getting usulans:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
      status: "Error",
    });
  }
};

export { createUsulan, getUserUsulans };
