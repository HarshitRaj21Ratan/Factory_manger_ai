import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { store } from "@/src/lib/store";

let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const client = getGeminiClient();
  if (!client) {
    return NextResponse.json({
      success: true,
      answer:
        "**AI Diagnostician Offline**\n\nNo `GEMINI_API_KEY` is configured. Add one to `.env.local` to enable AI-powered insights.\n\nYour query was: _\"" + prompt + "\"_",
    });
  }

  try {
    const { machines, alerts, inventory, workers } = store.getFullState();
    const contextPrompt = `
You are the Master Factory AI Intelligent Core (IndustrialOS Core Engine).
Here is the complete live factory telemetry status from Factory Site Alpha-9:

**Machines Telemetry**:
${JSON.stringify(machines, null, 2)}

**Active Unresolved Alerts**:
${JSON.stringify(alerts, null, 2)}

**Core Raw Inventory Levels**:
${JSON.stringify(inventory, null, 2)}

**Active Plant Workers**:
${JSON.stringify(workers, null, 2)}

Please address the following operator query regarding factory performance, safety metrics, or diagnostics:
"${prompt}"

Format your response in visual markdown, utilizing subheadings, bold metrics, and code blocks for critical parameters. Be highly realistic, professional, concise, and technical.
    `;

    const result = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contextPrompt,
      config: {
        systemInstruction:
          "You are an expert Chief Industrial Architect and Senior Factory Diagnostician. Produce deep, accurate, actionable, and rapid responses to plant queries.",
      },
    });

    return NextResponse.json({
      success: true,
      answer: result.text || "Diagnostic query returned empty telemetry responses.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate plant diagnostic insights.";
    console.error(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
