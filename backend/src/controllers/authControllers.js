import { prisma } from "../configs/utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
      expiresIn: "3h",
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

const register = async (req, res) => {
  const { nip, password } = req.body;

  try {
    // Cek apakah NIP ada di data pegawai
    const existingUser = await prisma.user.findUnique({
      where: { nip: nip },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "NIP tidak ditemukan dalam data pegawai",
      });
    }

    // Cek apakah sudah pernah registrasi
    if (existingUser.password) {
      return res.status(400).json({
        success: false,
        message: "Akun sudah terdaftar. Silakan login.",
      });
    }

    // Hash password dan update user
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { nip: nip },
      data: {
        password: hashedPassword,
        is_active: true,
        registered_at: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Registrasi berhasil",
      user: {
        nama: updatedUser.nama,
        nip: updatedUser.nip,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

export { login, register };
