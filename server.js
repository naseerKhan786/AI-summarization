// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeText from "./summarize.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.static("public")); // Serve static files

// Routes
app.post("/summarize", async (req, res, next) => {
  try {
    const { text_to_summarize } = req.body;

    if (!text_to_summarize) {
      return res.status(400).json({ error: "Missing required parameter: text_to_summarize" });
    }

    const summary = await summarizeText(text_to_summarize);
    res.json({ summary });
  } catch (err) {
    next(err);
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/`);
});
/**
 * AI summarization Generator
 * Original code by: trackzero
 * Modified by: Nasir_AI
 */
