import { prisma } from "../configs/utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  const { nip } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { nip },
    });

    if (!user) {
      return res.status(401).json({
        message: "NIP Salah",
      });
    }

    // Periksa apakah NIP di database sudah dalam format hash bcrypt
    if (user.nip.startsWith("$2")) {
      const isMatch = await bcrypt.compare(nip, user.nip);

      if (!isMatch) {
        return res.status(401).json({ message: "Nip Salah" });
      }
    } else {
      // Jika NIP belum di hash
      if (nip !== user.nip) {
        return res.status(401).json({
          message: "Nip Salah",
        });
      }

      // Hash NIP yang baru dimasukkan
      const hashedNIp = await bcrypt.hash(nip, 10);

      // Perbarui NIP di database dengan versi yang sudah di-hash
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: { nip: hashedNIp },
      });
    }

    // Buat token JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        nip: user.nip,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login Berhasil",
      token,
      status: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan Server",
      error: error.message,
    });
  }
};

export { login };
