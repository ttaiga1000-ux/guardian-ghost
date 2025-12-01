import express from "express";
import bodyParser from "body-parser";
import path from "path";
import advice from "./api/advice.js";

const app = express();
app.use(bodyParser.json());

// API
app.post("/api/advice", advice);

// フロント
app.use(express.static("dist"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
