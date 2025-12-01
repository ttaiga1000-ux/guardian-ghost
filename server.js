import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import chatRouter from "./api/chat.js";

const app = express();
app.use(cors());
app.use(express.json());

// API
app.use("/api/chat", chatRouter);

// 静的ファイル（Vite build後）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => console.log("Server on http://localhost:3000"));
