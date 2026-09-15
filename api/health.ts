import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const rawKey = process.env.GEMINI_API_KEY;
  const isKeyConfigured = Boolean(
    rawKey && rawKey !== "MY_GEMINI_API_KEY" && rawKey.trim().length > 10
  );

  res.status(200).json({
    status: "ok",
    hasGeminiApiKey: isKeyConfigured,
    keyPrefix: isKeyConfigured ? `${rawKey!.trim().slice(0, 6)}...` : "none",
  });
}
