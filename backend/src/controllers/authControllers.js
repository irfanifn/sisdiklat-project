import { prisma } from "../configs/utils.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { nip } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { nip: nip },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "NIP tidak valid",
      });
    }

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = {
      id: user.user_id,
      nama: user.nama,
      nip: user.nip,
      email: user.email,
      jabatan: user.jabatan,
      role: user.role,
      nama_opd: user.nama_opd,
    };

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
      message: "Terjadi kesalahan server",
    });
  }
};

export { login };
