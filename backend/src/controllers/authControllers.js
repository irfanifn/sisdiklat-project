import { prisma } from "../configs/utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { nip } = req.body;

  try {
    // Cari user berdasarkan NIP yang diinput
    const user = await prisma.user.findUnique({
      where: { nip: nip.toString() }, // Gunakan toString() untuk memastikan tipe data
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "NIP tidak valid",
      });
    }

    // Periksa apakah NIP di database sudah dalam format hash bcrypt
    if (user.nip.startsWith("$2")) {
      const isMatch = await bcrypt.compare(nip, user.nip);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "NIP tidak valid",
        });
      }
    } else {
      // Jika NIP belum di-hash (migrasi data)
      if (nip !== user.nip) {
        return res.status(401).json({
          success: false,
          message: "NIP tidak valid",
        });
      }
      // Hash NIP dan perbarui di database
      const hashedNip = await bcrypt.hash(nip, 10);
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: { nip: hashedNip },
      });
    }

    // Buat token JWT
    const token = jwt.sign(
      { user_id: user.user_id, nip: user.nip }, // Payload
      process.env.JWT_SECRET, // Secret
      { expiresIn: "1h" } // Opsi
    );

    // Hapus properti sensitif sebelum mengirim data user
    const { password, refreshToken, ...userData } = user;

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      token,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

export { login };
