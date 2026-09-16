import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { runFootballPrediction } from "./api/predict";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));

  // API and static asset routes FIRST
  app.get("/favicon.ico", (req, res) => {
    const icoPath = path.join(process.cwd(), "public", "favicon.ico");
    res.sendFile(icoPath);
  });

  app.get("/favicon.svg", (req, res) => {
    const svgPath = path.join(process.cwd(), "public", "favicon.svg");
    res.type("image/svg+xml").sendFile(svgPath);
  });

  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY")
    });
  });

  app.post("/api/predict", async (req, res) => {
    try {
      const { rawInput } = req.body;
      if (!rawInput || typeof rawInput !== 'string' || !rawInput.trim()) {
        return res.status(400).json({ error: "Please paste at least one team or match." });
      }

      const prediction = await runFootballPrediction(rawInput);
      return res.json(prediction);
    } catch (err: any) {
      console.error("Prediction error:", err);
      return res.status(500).json({
        error: "Failed to generate prediction. Please try again.",
        details: err?.message || String(err)
      });
    }
  });

  // Vite middleware for development (with hmr: false to prevent websocket errors in iframe preview)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CmionPredicts server running on http://localhost:${PORT}`);
  });
}

startServer();
