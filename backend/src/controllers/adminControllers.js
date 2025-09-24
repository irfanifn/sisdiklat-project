import { prisma } from "../configs/utils.js";

const getAllPengajuan = async (req, res) => {
  try {
    // Ambil query parameters
    const {
      status,
      search,
      page = 1,
      limit = 10,
      startDate,
      endDate,
    } = req.query;

    // Build where clause
    const whereClause = {};

    // Filter by tanggal
    if (startDate || endDate) {
      whereClause.tanggal_pengajuan = {};
      if (startDate) {
        whereClause.tanggal_pengajuan.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.tanggal_pengajuan.lte = new Date(endDate);
      }
    }

    // Search by nama pegawai, NIP, atau jenis usulan
    if (search && search.trim()) {
      whereClause.OR = [
        // Search di user
        {
          user: {
            OR: [
              { nama: { contains: search.trim() } },
              { nip: { contains: search.trim() } },
              { email: { contains: search.trim() } },
            ],
          },
        },
        // Search di jenis usulan
        { jenis_usulan: { contains: search.trim() } },
      ];
    }

    // Untuk pagination
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Query pengajuan dengan filter
    const pengajuans = await prisma.usulan.findMany({
      where: whereClause,
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
          take: 1, // Ambil status terbaru saja
        },
      },
      orderBy: { tanggal_pengajuan: "desc" },
      skip: skip,
      take: pageSize,
    });

    let filteredPengajuans = pengajuans;
    if (status && status.trim()) {
      filteredPengajuans = pengajuans.filter((pengajuan) => {
        const currentStatus = pengajuan.riwayatStatus?.[0]?.status || "pending";
        return currentStatus.toLowerCase() === status.toLowerCase();
      });
    }

    // Count total untuk pagination
    const totalCount = await prisma.usulan.count({
      where: whereClause,
    });

    // Response dengan metadata pagination
    res.status(200).json({
      success: true,
      data: filteredPengajuans,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
      message: "Data pengajuan berhasil diambil",
    });
  } catch (err) {
    console.error("Error getting all pengajuan:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
      status: "Error",
    });
  }
};

// GET /api/bkpsdm/status - Get semua riwayat status untuk admin dengan filter
const getAllRiwayatStatus = async (req, res) => {
  try {
    // Ambil query parameters
    const {
      status,
      search,
      page = 1,
      limit = 10,
      startDate,
      endDate,
    } = req.query;

    // Build where clause untuk riwayatStatus
    const whereClause = {};

    // Filter by tanggal perubahan
    if (startDate || endDate) {
      whereClause.tanggal_perubahan = {};
      if (startDate) {
        whereClause.tanggal_perubahan.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.tanggal_perubahan.lte = new Date(endDate);
      }
    }

    // Filter by status
    if (status && status.trim()) {
      whereClause.status = {
        equals: status.trim(),
      };
    }

    // Search by nama pegawai, NIP, atau jenis usulan
    if (search && search.trim()) {
      whereClause.usulan = {
        OR: [
          // Search di user
          {
            user: {
              OR: [
                { nama: { contains: search.trim() } },
                { nip: { contains: search.trim() } },
              ],
            },
          },
          // Search di jenis usulan
          { jenis_usulan: { contains: search.trim() } },
        ],
      };
    }

    // Untuk pagination
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Query riwayat status dengan filter
    const riwayatStatus = await prisma.riwayatStatus.findMany({
      where: whereClause,
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
      skip: skip,
      take: pageSize,
    });

    // Count total untuk pagination
    const totalCount = await prisma.riwayatStatus.count({
      where: whereClause,
    });

    // Response dengan metadata pagination
    res.status(200).json({
      success: true,
      data: riwayatStatus,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
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
  const adminUserId = req.user.user_id;

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
