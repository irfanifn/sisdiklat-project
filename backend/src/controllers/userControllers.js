import { prisma } from "../configs/utils.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, nip } = req.body;
    if (!email || !nip) {
      return res.json({ message: "Email and NIP are required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ message: "Invalid email format" });
    }

    if (nip.length != 18) {
      return res.json({ message: "NIP must be 18 characters long" });
    }

    const user = await prisma.user.findUnique({ nip });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = nip === user.nip;

    if (isMatch) {
      const token = createToken(user.id);
      res.json({ success: true, message: "Login successful", token });
    } else {
      res.json({ success: false, message: "Invalid NIP" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser };
