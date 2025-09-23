import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllPengajuan,
  getAllRiwayatStatus,
  approvePengajuan,
  rejectPengajuan,
} from "../controllers/adminControllers.js";

const adminRouter = express.Router();

adminRouter.get("/bkpsdm/pengajuan", authMiddleware, getAllPengajuan);
adminRouter.get("/bkpsdm/status", authMiddleware, getAllRiwayatStatus);
adminRouter.put(
  "/bkpsdm/pengajuan/:id/approve",
  authMiddleware,
  approvePengajuan
);
adminRouter.put(
  "/bkpsdm/pengajuan/:id/reject",
  authMiddleware,
  rejectPengajuan
);

export default adminRouter;
