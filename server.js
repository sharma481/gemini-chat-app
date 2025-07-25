const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { default: fetch } = require("node-fetch"); // ✅ fix: fetch import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  const userMessage = req.body.message;

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: userMessage }] }]
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Gemini API failed");

    const reply = data.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (error) {
    console.error("❌Server Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
