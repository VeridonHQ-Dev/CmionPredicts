import type { VercelRequest, VercelResponse } from "@vercel/node";
import { runFootballPrediction } from "../src/server/footballEngine";

// Configure maximum execution duration on Vercel
export const maxDuration = 60;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Please use POST." });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // use raw string
      }
    }

    const rawInput = body?.rawInput || (typeof body === "string" ? body : "");
    if (!rawInput || typeof rawInput !== "string" || !rawInput.trim()) {
      return res.status(400).json({ error: "Please paste at least one team or match." });
    }

    const prediction = await runFootballPrediction(rawInput);
    return res.status(200).json(prediction);
  } catch (err: any) {
    console.error("Vercel API prediction error:", err);
    return res.status(500).json({
      error: err?.message || "Failed to generate prediction. Please try again.",
      details: err?.stack || String(err),
    });
  }
}
