import { prisma } from "../configs/utils.js";

const getUserById = async (req, res) => {
  let { user_id } = req.params;
  try {
    let userById = await prisma.user.findUnique({
      where: { user_id: parseInt(user_id) },
    });
    if (!userById) {
      return res.status(404).json({
        messsage: "User not found",
        status: "Error",
      });
    }
    res.status(200).json({
      data: userById,
      message: "Get user by id successfully",
      status: "Success",
    });
    return;
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error,
      status: "Error",
    });
  }
};

export { getUserById };
