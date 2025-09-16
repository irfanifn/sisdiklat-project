import express from "express";
import cors from "cors";
import userRouter from "./src/routers/userRoutes.js";
import profileRouter from "./src/routers/profileRoutes.js";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api", profileRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});
