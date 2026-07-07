import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import importRoutes from "./routes/importRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/import", importRoutes);

export default app;