import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Ambil token dari header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (token === null) {
    return res.sendStatus(401);
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user; // Data pengguna yang sudah diverifikasi
    next();
  });
};

export default authMiddleware;
