import { prisma } from "../configs/utils.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { nip } = req.body;
    if (!nip) {
      return res.json({ message: "NIP are required" });
    }

    const user = await prisma.user.findUnique({
      where: { nip },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid NIP",
      });
    }

    const token = createToken(user.id);
    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser };
