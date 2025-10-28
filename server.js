import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// ここから追加部分
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// index.html などを公開（同じフォルダにある場合）
app.use(express.static(__dirname));
// ここまで追加部分
// チャットAPI
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a gentle ghost who talks like a kind guardian spirit." },
        { role: "user", content: userMessage },
      ],
    }),
  });

  const data = await response.json();
  res.json({ reply: data.choices?.[0]?.message?.content || "..." });
});

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
