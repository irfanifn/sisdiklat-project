import { prisma } from "../configs/utils.js";

// Get persyaratan berdasarkan jenis usulan
const getPersyaratan = async (req, res) => {
  const { jenisUsulan } = req.params;

  try {
    const persyaratan = await prisma.persyaratanDokumen.findUnique({
      where: { jenis_usulan: jenisUsulan.toUpperCase() },
    });

    if (!persyaratan) {
      return res.status(404).json({
        success: false,
        message: "Persyaratan tidak ditemukan",
      });
    }
    res.status(200).json({
      success: true,
      data: persyaratan,
    });
  } catch (error) {
    console.error("Error getting persyaratan :", error);
    res.status(505).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Update Persyaratan
const updatePersyaratan = async (req, res) => {
  const { jenisUsulan } = req.params;
  const { deskripsi } = req.body;

  try {
    const updated = await prisma.persyaratanDokumen.update({
      where: { jenis_usulan: jenisUsulan.toUpperCase() },
      data: { deskripsi },
    });
    res.status(200).json({
      success: true,
      data: updated,
      message: "Persyaratan berhasil diupdate",
    });
  } catch (error) {
    console.error("Error updating persyaratan:", error),
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      });
  }
};

export { getPersyaratan, updatePersyaratan };
