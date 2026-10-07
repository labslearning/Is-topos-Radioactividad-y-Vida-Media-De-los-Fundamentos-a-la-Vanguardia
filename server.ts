import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_PERSONA_PROMPT = `You are "QUANTUM-CORE AI", an elite, charismatic, and visionary multi-lingual educational simulator specialized strictly in Topic 2.3: Isotopes, basic radioactivity, half-life (t½) decay kinetics, and real-world applications (radiocarbon C-14 dating, medical PET scans with Fluorine-18, Iodine-131 targeted thyroid ablation, Cobalt-60 Gamma Knife radiosurgery, and nuclear fission energy).

Persona guidelines:
- Act like a Nobel-winning professor combined with a cutting-edge game designer.
- Use brilliant analogies (e.g., half-life as a decaying cosmic hourglass; isotopes as identical sports cars carrying lead bars in the trunk; C-14 as an active biological subscription cancelled at death; F-18 PET scans as antimatter molecular beacons).
- Never be dry, basic, or rote: shatter superficial memorization with intuitive mental models and rigorous particle physics.
- Multilingual fluency: strictly respond in the language requested (Spanish/Español, English, French/Français, or German/Deutsch).
- Tone: High-energy, intellectually thrilling, sharp, empathetic. Use strategic markdown and formatting.`;

// 1. AI Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, language = 'en', topic } = req.body;
    
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
        fallback: true
      });
    }

    const conversationHistory = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conversationHistory,
      config: {
        systemInstruction: `${SYSTEM_PERSONA_PROMPT}\nTarget Language: ${language}. Current Physics Focus: ${topic || 'Quantum & Nuclear Physics'}. Always respond in ${language}.`,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

// 2. Micro-Class Protocol Endpoint
app.post('/api/micro-class', async (req: Request, res: Response) => {
  try {
    const { question, selectedOption, correctOption, explanation, language = 'en' } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
        fallback: true
      });
    }

    const prompt = `Trigger the Micro-Class Protocol for a student who chose "${selectedOption}" instead of "${correctOption}" for the following physics challenge:
Question: "${question}"
Core Physics Fact: "${explanation}"

Protocol Structure:
1. Deeply empathetic validation (e.g., "Normal! This is one of the most abstract quantum concepts...").
2. A powerful, vivid 3-sentence intuitive analogy targeting why "${selectedOption}" is a common pitfall and how to mentally see the reality.
3. A simplified formative check question (with 2 quick options) to solidify intuition before resuming.

Output strictly in ${language}. Keep it punchy, electrifying, and concise.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PERSONA_PROMPT,
        temperature: 0.6,
      }
    });

    res.json({ microClass: response.text });
  } catch (error: any) {
    console.error('Micro-class error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate micro-class' });
  }
});

// 3. Dynamic Custom MCQ Generator
app.post('/api/generate-mcq', async (req: Request, res: Response) => {
  try {
    const { module, difficulty, language = 'en' } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
        fallback: true
      });
    }

    const prompt = `Generate a brand new, highly engaging Multiple Choice Question (MCQ) for Topic 2.3: Isotopes and basic radioactivity: Concept of half-life and real-world applications (Difficulty: "${difficulty || 'standard'}").
Core concepts covered:
- Isotopes, atomic number Z, neutron count N, nuclear stability belt, strong nuclear force vs Coulomb repulsion.
- 4 Radioactive decay modes: Alpha (α), Beta-minus (β⁻), Beta-plus/positron (β⁺), Gamma (γ), and shielding materials (paper, aluminum, lead).
- Half-life (t½) decay kinetics: N(t) = N₀(1/2)^(t/t½) = N₀e^(-λt), decay constant λ, activity A(t) in Becquerels.
- Real-world applications: Radiocarbon dating (Carbon-14), Medical PET scans with Fluorine-18 (positron-electron annihilation producing dual 511 keV gamma rays at 180°), Iodine-131 targeted thyroid ablation, Cobalt-60 radiotherapy (Gamma Knife), and nuclear energy.

Format strictly as JSON with the following structure:
{
  "question": "Clear, exciting question text",
  "options": [
    {"id": "A", "text": "Option text"},
    {"id": "B", "text": "Option text"},
    {"id": "C", "text": "Option text"},
    {"id": "D", "text": "Option text"}
  ],
  "correctOptionId": "A",
  "reinforcement": "Crisp 1-sentence scientific validation for when answered correctly",
  "microClassAnalogy": "Vivid 3-sentence analogy explaining the concept if missed",
  "hint": "Strategic mental model hint"
}
Output in ${language}. Ensure the science is rigorous and exact.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `${SYSTEM_PERSONA_PROMPT}\nAlways respond with valid JSON matching the schema.`,
        responseMimeType: 'application/json',
        temperature: 0.6,
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ challenge: parsed });
  } catch (error: any) {
    console.error('Generate MCQ error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate MCQ' });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`QUANTUM-CORE AI Server running on port ${PORT} [${isDev ? 'development' : 'production'}]`);
  });
}

startServer();
