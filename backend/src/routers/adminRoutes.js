import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllPengajuan,
  getAllRiwayatStatus,
  approvePengajuan,
  rejectPengajuan,
} from "../controllers/adminControllers.js";
import {
  getPersyaratan,
  updatePersyaratan,
} from "../controllers/persyaratanControllers.js";

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
adminRouter.get("/persyaratan/:jenisUsulan", authMiddleware, getPersyaratan);
adminRouter.put("/persyaratan/:jenisUsulan", authMiddleware, updatePersyaratan);

export default adminRouter;
