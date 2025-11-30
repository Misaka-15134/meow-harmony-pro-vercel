import { AIRecommendation } from "../types";
import { fetchGeminiRecommendations } from "./llm/geminiService";

// --- 工具函数：清理和解析 JSON ---
const cleanAndParseJSON = (text: string) => {
  try {
    // 移除可能存在的 Markdown 代码块标记
    const cleanText = text.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    console.log("Raw Text:", text);
    throw new Error("AI 返回的格式无法解析，请重试");
  }
};

// --- 通用 Prompt 构建器 ---
const buildSystemPrompt = () => {
  return "You are a music theory assistant. Please output valid JSON only.";
};

const buildUserPrompt = (context: string[], goal: string, customInstruction: string) => {
  return `
    Context (Current Chord Progression): ${JSON.stringify(context)}
    User Goal: ${goal}
    Additional Instructions: ${customInstruction}
    
    IMPORTANT TASK: Suggest the next chords.
    OUTPUT FORMAT: Return a STRICT JSON object (no markdown) with two fields:
    1. "reasoning": A string explaining your thought process briefly.
    2. "recommendations": An array of objects, where each object has:
       - "root": string (e.g., "C", "F#")
       - "type": string (valid types: maj, min, 7, maj7, min7, dim, aug, etc.)
       - "explanation": string (why this chord fits)
  `;
};

// --- 通用 OpenAI 兼容格式调用函数 (DeepSeek, Kimi, OpenRouter, GPT) ---
const callOpenAICompatibleAPI = async (
  url: string,
  apiKey: string,
  model: string,
  context: string[],
  goal: string,
  customInstruction: string
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: buildUserPrompt(context, goal, customInstruction) }
        ],
        temperature: 1.2 //稍微高一点的创造性
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    return cleanAndParseJSON(content);

  } catch (error) {
    console.error(`${model} Call Failed:`, error);
    return { 
      reasoning: `调用失败: ${error instanceof Error ? error.message : String(error)}`, 
      recommendations: [] 
    };
  }
};

// --- Claude (Anthropic) 专用调用函数 ---
const fetchClaudeRecommendations = async (apiKey: string, context: string[], goal: string, customInstruction: string) => {
  try {
    // 注意：Claude 在浏览器端直接调用可能会遇到 CORS 跨域问题。
    // 如果遇到 CORS 报错，建议使用 OpenRouter 调用 Claude 模型，或者需要通过后端代理转发。
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
        // "dangerously-allow-browser": "true" // 某些 SDK 支持此选项，原生 fetch 不支持
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [
            { role: "user", content: buildSystemPrompt() + "\n" + buildUserPrompt(context, goal, customInstruction) }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || "{}";
    return cleanAndParseJSON(content);

  } catch (error) {
    return { reasoning: "Claude 调用失败 (可能是CORS跨域限制，建议使用OpenRouter): " + error, recommendations: [] };
  }
};

// --- 具体服务的实现 ---

const fetchDeepSeekRecommendations = (apiKey: string, context: string[], goal: string, customInstruction: string) => {
  return callOpenAICompatibleAPI(
    "https://api.deepseek.com/chat/completions",
    apiKey,
    "deepseek-chat",
    context, goal, customInstruction
  );
};

const fetchKimiRecommendations = (apiKey: string, context: string[], goal: string, customInstruction: string) => {
  return callOpenAICompatibleAPI(
    "https://api.moonshot.cn/v1/chat/completions",
    apiKey,
    "moonshot-v1-8k",
    context, goal, customInstruction
  );
};

const fetchGptRecommendations = (apiKey: string, context: string[], goal: string, customInstruction: string) => {
  return callOpenAICompatibleAPI(
    "https://api.openai.com/v1/chat/completions",
    apiKey,
    "gpt-4-turbo-preview", // 或者 gpt-3.5-turbo
    context, goal, customInstruction
  );
};

const fetchOpenRouterRecommendations = (apiKey: string, model: string, context: string[], goal: string, customInstruction: string) => {
  return callOpenAICompatibleAPI(
    "https://openrouter.ai/api/v1/chat/completions",
    apiKey,
    model || "openai/gpt-3.5-turbo", // 默认模型
    context, goal, customInstruction
  );
};


// --- 接口与类定义 (保持原样) ---

export interface LLMService {
  fetchRecommendations(
    apiKey: string,
    context: string[],
    goal: string,
    customInstruction: string,
    model?: string,
  ): Promise<{ reasoning: string; recommendations: AIRecommendation[] }>;
}

class GeminiService implements LLMService {
  fetchRecommendations(apiKey: string, context: string[], goal: string, customInstruction: string) {
    return fetchGeminiRecommendations(apiKey, context, goal, customInstruction);
  }
}

class ClaudeService implements LLMService {
  fetchRecommendations(apiKey: string, context: string[], goal: string, customInstruction: string) {
    return fetchClaudeRecommendations(apiKey, context, goal, customInstruction);
  }
}
  
class DeepSeekService implements LLMService {
  fetchRecommendations(apiKey: string, context: string[], goal: string, customInstruction: string) {
    return fetchDeepSeekRecommendations(apiKey, context, goal, customInstruction);
  }
}
  
class KimiService implements LLMService {
  fetchRecommendations(apiKey: string, context: string[], goal: string, customInstruction: string) {
    return fetchKimiRecommendations(apiKey, context, goal, customInstruction);
  }
}
  
class OpenRouterService implements LLMService {
  fetchRecommendations(apiKey: string, context: string[], goal: string, customInstruction: string, model?: string) {
    return fetchOpenRouterRecommendations(apiKey, model || 'openai/gpt-3.5-turbo', context, goal, customInstruction);
  }
}
  
class GptService implements LLMService {
  fetchRecommendations(apiKey: string, context: string[], goal: string, customInstruction: string) {
    return fetchGptRecommendations(apiKey, context, goal, customInstruction);
  }
}

export const llmServiceFactory = (provider: string): LLMService | null => {
  switch (provider) {
    case 'gemini':
      return new GeminiService();
    case 'claude':
      return new ClaudeService();
    case 'deepseek':
      return new DeepSeekService();
    case 'kimi':
      return new KimiService();
    case 'openrouter':
      return new OpenRouterService();
    case 'gpt':
        return new GptService();
    default:
      return null;
  }
};