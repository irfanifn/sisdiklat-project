import { prisma } from "../configs/utils";

const loginUser = async (req, res) => {
  try {
    const { nama, nip } = req.body;
    if (!nama || !nip) {
      return res.status(400).json({ message: "Nama and NIP are required" });
    }

    const user = await prisma.user.findUnique({});
  } catch (error) {}
};

export { loginUser };
