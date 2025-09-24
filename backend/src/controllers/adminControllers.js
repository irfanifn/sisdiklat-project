import { prisma } from "../configs/utils.js";

const getAllPengajuan = async (req, res) => {
  try {
    const {
      status,
      startDate,
      endDate,
      search,
      page = 1,
      limit = 10,
    } = req.query;
    const pageNum = isNaN(parseInt(page)) ? 1 : parseInt(page);
    const limitNum = isNaN(parseInt(limit)) ? 10 : parseInt(limit);
    const skip = (pageNum - 1) * limitNum >= 0 ? (pageNum - 1) * limitNum : 0;

    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({
        success: false,
        message: "Parameter page dan limit harus lebih besar dari 0",
      });
    }

    const where = {};

    if (status) {
      where.riwayatStatus = {
        some: {
          status: {
            equals: status.toLowerCase(),
          },
        },
      };
    }

    if (startDate || endDate) {
      where.tanggal_pengajuan = {};
      if (startDate) {
        where.tanggal_pengajuan.gte = new Date(startDate);
      }
      if (endDate) {
        where.tanggal_pengajuan.lte = new Date(endDate);
      }
    }

    if (search) {
      const searchLower = search.toLowerCase();
      where.OR = [
        { user: { nama: { contains: searchLower } } },
        { user: { nip: { contains: searchLower } } },
        { jenis_usulan: { contains: searchLower } },
      ];
    }

    const totalItems = await prisma.usulan.count({ where });

    const pengajuans = await prisma.usulan.findMany({
      where,
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
        dokumenSyarat: {
          select: {
            dok_id: true,
            nama_file: true,
            path_file: true,
            status_verifikasi: true,
          },
        },
        riwayatStatus: {
          orderBy: { tanggal_perubahan: "desc" },
          take: 1,
        },
      },
      orderBy: { tanggal_pengajuan: "desc" },
      skip,
      take: limitNum,
    });

    res.status(200).json({
      success: true,
      data: pengajuans,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limitNum),
        currentPage: pageNum,
        limit: limitNum,
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

const getAllRiwayatStatus = async (req, res) => {
  try {
    const {
      status,
      startDate,
      endDate,
      search,
      page = 1,
      limit = 10,
    } = req.query;
    const pageNum = isNaN(parseInt(page)) ? 1 : parseInt(page);
    const limitNum = isNaN(parseInt(limit)) ? 10 : parseInt(limit);
    const skip = (pageNum - 1) * limitNum >= 0 ? (pageNum - 1) * limitNum : 0;

    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({
        success: false,
        message: "Parameter page dan limit harus lebih besar dari 0",
      });
    }

    const where = {};

    if (status) {
      where.status = {
        equals: status.toLowerCase(),
      };
    }

    if (startDate || endDate) {
      where.tanggal_perubahan = {};
      if (startDate) {
        where.tanggal_perubahan.gte = new Date(startDate);
      }
      if (endDate) {
        where.tanggal_perubahan.lte = new Date(endDate);
      }
    }

    if (search) {
      const searchLower = search.toLowerCase();
      where.OR = [
        { usulan: { user: { nama: { contains: searchLower } } } },
        { usulan: { user: { nip: { contains: searchLower } } } },
        { usulan: { jenis_usulan: { contains: searchLower } } },
      ];
    }

    const totalItems = await prisma.riwayatStatus.count({ where });

    const riwayatStatus = await prisma.riwayatStatus.findMany({
      where,
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
      skip,
      take: limitNum,
    });

    res.status(200).json({
      success: true,
      data: riwayatStatus,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limitNum),
        currentPage: pageNum,
        limit: limitNum,
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
  const UserId = req.user.user_id;

  try {
    const usulan = await prisma.usulan.findUnique({
      where: { usulan_id: parseInt(id) },
    });

    if (!usulan) {
      return res.status(404).json({
        success: false,
        message: "Usulan tidak ditemukan",
      });
    }

    await prisma.riwayatStatus.create({
      data: {
        usulan_id: parseInt(id),
        status: "disetujui",
        catatan: "Usulan telah disetujui setelah verifikasi dokumen",
        tanggal_perubahan: new Date(),
      },
    });

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
    if (!catatan || !catatan.trim()) {
      return res.status(400).json({
        success: false,
        message: "Catatan penolakan harus diisi",
      });
    }

    const usulan = await prisma.usulan.findUnique({
      where: { usulan_id: parseInt(id) },
    });

    if (!usulan) {
      return res.status(404).json({
        success: false,
        message: "Usulan tidak ditemukan",
      });
    }

    await prisma.riwayatStatus.create({
      data: {
        usulan_id: parseInt(id),
        status: "ditolak",
        catatan: catatan.trim(),
        tanggal_perubahan: new Date(),
      },
    });

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
