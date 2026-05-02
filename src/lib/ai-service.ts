/**
 * AI Service — Multi-provider: Gemini (REST), DeepSeek & Groq (OpenAI-compatible).
 *
 * Gemini: direct fetch() to REST API with model fallback chain
 * DeepSeek: OpenAI-compatible endpoint (https://api.deepseek.com)
 * Groq: OpenAI-compatible endpoint (https://api.groq.com/openai/v1)
 */

import type { AIProvider } from "./store";

export type OptimizeField = "title" | "description";

interface AIResponse {
  text: string;
  error?: string;
}

export function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Delay between bulk requests (ms). */
export const BULK_DELAY_MS = 2000;

// ─── Gemini (REST API with model fallback) ───────────────────────────────────

const GEMINI_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
];

let geminiWorkingModel: string | null = null;

async function callGemini(
  apiKey: string,
  systemPrompt: string,
  url: string,
  field: OptimizeField,
): Promise<AIResponse> {
  const maxOutputTokens = field === "title" ? 60 : 120;

  const tryModel = async (model: string): Promise<{ ok: boolean; quotaZero: boolean; response: AIResponse }> => {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: `A URL alvo é: ${url}` }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens },
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const apiMsg = body?.error?.message || `HTTP ${res.status}`;
      const isQuotaZero = apiMsg.includes("limit: 0") || (res.status === 429 && apiMsg.includes("quota"));

      if (isQuotaZero || res.status === 404) {
        return { ok: false, quotaZero: true, response: { text: "", error: apiMsg } };
      }

      // Real rate limit — retry once after 2s
      if (res.status === 429) {
        await delay(2000);
        const retry = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: `A URL alvo é: ${url}` }] }],
            generationConfig: { temperature: 0.1, maxOutputTokens },
          }),
        });
        if (retry.ok) {
          const data = await retry.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
          return { ok: !!text, quotaZero: false, response: { text } };
        }
        return { ok: false, quotaZero: false, response: { text: "", error: `[Gemini/${model}] Rate limit. Aguarde e tente novamente.` } };
      }

      return { ok: false, quotaZero: false, response: { text: "", error: `[Gemini] Erro ${res.status}: ${apiMsg}` } };
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
    if (!text) return { ok: false, quotaZero: false, response: { text: "", error: "[Gemini] Resposta vazia." } };

    geminiWorkingModel = model;
    return { ok: true, quotaZero: false, response: { text } };
  };

  try {
    // Try cached model first
    if (geminiWorkingModel) {
      const result = await tryModel(geminiWorkingModel);
      if (result.ok) return result.response;
      if (!result.quotaZero) return result.response;
      geminiWorkingModel = null;
    }

    // Fallback chain
    const tried: string[] = [];
    for (const model of GEMINI_MODELS) {
      const result = await tryModel(model);
      if (result.ok) return result.response;
      if (result.quotaZero) { tried.push(model); continue; }
      return result.response;
    }

    return { text: "", error: `[Gemini] Nenhum modelo disponível. Testados: ${tried.join(", ")}. Tente outra chave ou use DeepSeek/Groq.` };
  } catch (err) {
    return { text: "", error: `[Gemini] ${err instanceof Error ? err.message : "Erro de rede"}` };
  }
}

// ─── OpenAI-compatible (DeepSeek + Groq) ─────────────────────────────────────

const PROVIDER_CONFIG = {
  deepseek: {
    baseUrl: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-chat",
    label: "DeepSeek",
  },
  groq: {
    baseUrl: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",
    label: "Groq",
  },
} as const;

async function callOpenAICompatible(
  provider: "deepseek" | "groq",
  apiKey: string,
  systemPrompt: string,
  url: string,
  field: OptimizeField,
): Promise<AIResponse> {
  const config = PROVIDER_CONFIG[provider];
  const maxTokens = field === "title" ? 60 : 120;

  try {
    const res = await fetch(config.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0.1,
        max_tokens: maxTokens,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `A URL alvo é: ${url}` },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const apiMsg = body?.error?.message || `HTTP ${res.status}`;

      if (res.status === 401) return { text: "", error: `[${config.label}] API Key inválida. Verifique se copiou corretamente.` };
      if (res.status === 429) return { text: "", error: `[${config.label}] Rate limit excedido. Aguarde e tente novamente.` };
      return { text: "", error: `[${config.label}] Erro ${res.status}: ${apiMsg}` };
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { text: "", error: `[${config.label}] Resposta vazia.` };

    return { text };
  } catch (err) {
    return { text: "", error: `[${config.label}] ${err instanceof Error ? err.message : "Erro de rede"}` };
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function optimizeField(
  provider: AIProvider,
  apiKey: string,
  systemPrompt: string,
  targetUrl: string,
  field: OptimizeField,
): Promise<AIResponse> {
  if (provider === "gemini") {
    return callGemini(apiKey, systemPrompt, targetUrl, field);
  }
  return callOpenAICompatible(provider, apiKey, systemPrompt, targetUrl, field);
}
