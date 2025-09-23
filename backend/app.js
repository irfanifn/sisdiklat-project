import express from "express";
import cors from "cors";
import userRouter from "./src/routers/userRoutes.js";
import profileRouter from "./src/routers/profileRoutes.js";
import usulanRouter from "./src/routers/usulanRoutes.js";
import adminRouter from "./src/routers/adminRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", userRouter);
app.use("/api", profileRouter);
app.use("/api", usulanRouter);
app.use("/api", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});
