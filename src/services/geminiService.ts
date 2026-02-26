import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiModel = "gemini-3-flash-preview";

export async function getExplanation(topic: string, language: 'en' | 'ur') {
  const prompt = language === 'en' 
    ? `Explain the networking concept of "${topic}" in detail based on Forouzan's Data Communications and Networking 5th Edition. Use simple language suitable for university students.`
    : `Explain the networking concept of "${topic}" in detail in Urdu (using Urdu script) based on Forouzan's Data Communications and Networking 5th Edition. Use professional yet easy-to-understand terms.`;

  try {
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error fetching explanation.";
  }
}
