
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function suggestCustomSlugs(url: string, description: string): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sugira 5 slugs curtos, memoráveis e profissionais para encurtar o seguinte link: ${url}. Contexto: ${description}. Retorne apenas um array JSON de strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    return JSON.parse(text || "[]");
  } catch (error) {
    console.error("Error generating slugs:", error);
    return [];
  }
}

export async function getLinkInsights(linkData: any): Promise<any> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise os dados de performance deste link e sugira melhorias de marketing: ${JSON.stringify(linkData)}. Forneça insights sobre como aumentar o CTR. Retorne em formato JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING }
                },
                required: ["title", "description", "severity"]
              }
            }
          },
          required: ["insights"]
        }
      }
    });

    return JSON.parse(response.text || '{"insights": []}');
  } catch (error) {
    console.error("Error generating insights:", error);
    return { insights: [] };
  }
}
