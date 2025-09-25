import { prisma } from "../configs/utils.js";
import multer from "multer";

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder tempat menyimpan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

// Filter untuk hanya menerima file tertentu (misal: PDF, DOC)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file PDF dan DOC yang diperbolehkan!"), false);
  }
};

// Inisialisasi multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
});

const createUsulan = async (req, res) => {
  const user_id = req.user.user_id;
  const { jenisUsulan, tanggalPengajuan } = req.body;
  const file = req.file; // File yang diunggah

  try {
    // Validasi jika tidak ada file yang diunggah
    if (!file) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Dokumen syarat wajib diunggah",
      });
    }

    // Buat usulan baru
    const newUsulan = await prisma.usulan.create({
      data: {
        user_id: parseInt(user_id),
        jenis_usulan: jenisUsulan,
        tanggal_pengajuan: new Date(tanggalPengajuan),
      },
    });

    // Simpan data dokumen syarat
    await prisma.dokumenSyarat.create({
      data: {
        usulan_id: newUsulan.usulan_id,
        nama_file: file.originalname,
        path_file: file.path,
        status_verifikasi: "pending",
      },
    });

    // Buat riwayat status
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
      message: "Usulan dan dokumen berhasil disubmit",
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
  try {
    const {
      status,
      startDate,
      endDate,
      search,
      page = 1,
      limit = 10,
    } = req.query;
    const userId = req.user.user_id; // Ambil user_id dari token
    const pageNum = isNaN(parseInt(page)) ? 1 : parseInt(page);
    const limitNum = isNaN(parseInt(limit)) ? 10 : parseInt(limit);
    const skip = (pageNum - 1) * limitNum >= 0 ? (pageNum - 1) * limitNum : 0;

    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({
        success: false,
        message: "Parameter page dan limit harus lebih besar dari 0",
      });
    }

    const where = {
      user_id: parseInt(userId), // Hanya ambil usulan milik pengguna yang login
    };

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
      where.jenis_usulan = {
        contains: searchLower,
      };
    }

    // Hitung total data untuk pagination
    const totalItems = await prisma.usulan.count({ where });

    // Ambil data usulan dengan filter, pagination, dan relasi
    const usulans = await prisma.usulan.findMany({
      where,
      include: {
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
      data: usulans,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalItems / limitNum),
        totalItems,
        limit: limitNum,
      },
      message: "Data usulan berhasil diambil",
    });
  } catch (err) {
    console.error("Error getting user usulans:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
      status: "Error",
    });
  }
};

export { createUsulan, getUserUsulans, upload };
