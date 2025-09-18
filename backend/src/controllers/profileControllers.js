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

    res.status(200).json({
      success: true,
      data: userProfile,
      message: "Profile retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: err.message,
      status: "Error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  const user_id = req.user.user_id; // dari authMiddleware
  const { nama, email, jabatan, nama_opd } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: parseInt(user_id) },
      data: {
        nama,
        email,
        jabatan,
        nama_opd,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getUserProfile, updateUserProfile };
