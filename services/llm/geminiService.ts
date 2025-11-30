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
    
    IMPORTANT: Valid chord types are: maj, min, 5, 7, maj7, min7, minMaj7, sus4, sus2, 6, min6, 9, min9, maj9, add9, 7sus4, dim, dim7, aug
    
    Return ONLY a valid JSON object with the following structure:
    {
      "reasoning": "A short, concise sentence explaining the choice in Chinese (Simplified Chinese).",
      "recommendations": [
        { "note": "C", "type": "maj", "label": "温暖稳定" },
        { "note": "F", "type": "maj7", "label": "柔和色彩" },
        { "note": "G", "type": "7", "label": "属功能" }
      ]
    }
    
    Make sure:
    - "note" must be a single note name (C, C#, D, D#, E, F, F#, G, G#, A, A#, B)
    - "type" must be one of the valid chord types listed above
    - "label" should be a short Chinese description (2-4 characters)
    - Provide exactly 3 recommendations
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
    
    const parsed = JSON.parse(text);
    
    // 验证数据格式
    if (!parsed.reasoning || !Array.isArray(parsed.recommendations)) {
      throw new Error("无效的 AI 响应格式");
    }
    
    // 验证每个推荐项
    const validRecommendations = parsed.recommendations.filter((rec: any) => {
      return rec.note && rec.type && rec.label && 
             typeof rec.note === 'string' && 
             typeof rec.type === 'string' &&
             typeof rec.label === 'string';
    });
    
    if (validRecommendations.length === 0) {
      throw new Error("没有有效的推荐和弦");
    }
    
    return {
      reasoning: parsed.reasoning,
      recommendations: validRecommendations
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
