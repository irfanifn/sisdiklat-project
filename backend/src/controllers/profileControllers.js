import { prisma } from "../configs/utils.js";

const getUserProfile = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const userProfile = await prisma.user.findUnique({
      where: { user_id: parseInt(user_id) },
    });

    if (!userProfile) {
      return res.status(404).json({
        message: "User not found",
        status: "Error",
      });
    }

    // Hapus data sensitif sebelum mengirim respons
    delete userProfile.nip;
  } catch (err) {
    res.status(500).json({
      data: null,
      message: err.message,
      status: "Error",
    });
  }
};

export { getUserProfile };
