import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

process.on('SIGINT', () => {
  console.log('Server received SIGINT, shutting down...');
  process.exit(0);
});

process.on('exit', (code) => {
  console.log(`Process exited with code: ${code}`);
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ 
  model: process.env.GEMINI_MODEL || "gemini-1.5-flash" 
});

// Validate Idea Endpoint
app.post('/api/validate-idea', async (req, res) => {
  try {
    const { idea } = req.body;
    
    if (!idea || !idea.title || !idea.description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    // Combine input and enforce 300 char limit on the prompt dynamically
    const combinedInput = `${idea.title}. ${idea.description}`;
    const truncatedInput = combinedInput.substring(0, 300);

    const prompt = `Act like a brutally honest startup mentor. Analyze this idea: "${truncatedInput}" targeting ${idea.targetAudience} and return a raw JSON object (without markdown code blocks) with this exact structure:
    {
      "feasibility_score": (number 1-100),
      "market_score": (number 1-100),
      "innovation_score": (number 1-100),
      "market_demand": { "level": ("Low"|"Medium"|"High"), "description": "concise honest insight" },
      "target_audience_analysis": "honest analysis of audience gaps",
      "swot": {
        "strengths": ["...", "..."],
        "weaknesses": ["brutally honest problem 1", "brutally honest problem 2"],
        "opportunities": ["...", "..."],
        "threats": ["...", "..."]
      },
      "risks": ["risk 1", "risk 2", "risk 3"],
      "suggestions": ["improvement 1", "improvement 2"],
      "similar_products": ["competitor 1", "competitor 2"]
    }
    Make sure to critically highlight: Problems in the idea, realistic Improvements, and any Unique angles. Keep it concise.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Parse the JSON securely (handling possible markdown backticks)
    const jsonStr = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
    const parsedData = JSON.parse(jsonStr);

    res.json(parsedData);
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to process idea through AI." });
  }
});

// Generate Pitch Endpoint
app.post('/api/generate-pitch', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });

    const prompt = `Write a brutal, compelling 30-second elevator pitch (3-4 sentences max) for a startup called "${title.substring(0, 50)}". Focus strictly on the exact problem and unique angle. Avoid fluff.`;
    const result = await model.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate pitch." });
  }
});

// Improve Idea Endpoint
app.post('/api/improve-idea', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });

    const prompt = `Act as an expert product strategist. Iterate and improve this startup concept: "${title.substring(0, 50)}". Return a raw JSON object (no markdown) with this structure:
    {
      "improved_version": "short punchy description of a better pivot",
      "better_target_audience": "a more niche/lucrative target",
      "clearer_positioning": "how to market it uniquely"
    }`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    res.json(JSON.parse(jsonStr));
  } catch (error) {
    res.status(500).json({ error: "Failed to improve idea." });
  }
});

const server = app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please close the other process or use a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});
