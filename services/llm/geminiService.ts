import { GoogleGenAI } from "@google/genai";
import { AIRecommendation } from "../../types";

export const fetchGeminiRecommendations = async (
  apiKey: string,
  context: string[],
  goal: string,
  customInstruction: string
): Promise<{ reasoning: string, recommendations: AIRecommendation[] }> => {
  if (!apiKey) throw new Error("API Key is missing");

  // const genAI = new GoogleGenAI(apiKey);
  // const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    You are a professional music composer AI assistant (Persona: a helpful cat).
    Context (Chord Sequence): ${context.join(' -> ')}
    Goal: ${goal}
    Additional Instructions: ${customInstruction}
    
    Based on the context and goal, recommend 3 suitable next chords.
    If the goal involves Rock styles, prioritize Power Chords (5), Sus4, or modal interchanges typical of that rock subgenre.
    
    Return ONLY a valid JSON object with the following structure:
    {
      "reasoning": "A short, concise sentence explaining the choice in Chinese (Simple Simplified Chinese).",
      "recommendations": [
        { "note": "RootNote (e.g. C, F#)", "type": "ChordType (e.g. maj7, min7, 5)", "label": "Short description in Chinese (e.g. 温暖/属功能)" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
