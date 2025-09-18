import { prisma } from "../configs/utils.js";

const getUserProfile = async (req, res) => {
  // console.log("getUserProfile called"); // Debug 1
  // console.log("req.user:", req.user); // Debug 2

  const user_id = req.user.user_id;
  // console.log("user_id:", user_id); // Debug 3

  try {
    const userProfile = await prisma.user.findUnique({
      where: { user_id: parseInt(user_id) },
    });

    // console.log("userProfile from DB:", userProfile); // Debug 4

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
    // console.log("Error:", err); // Debug 5
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
