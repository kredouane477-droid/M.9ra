import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCaptionForImage = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType
            }
          },
          {
            text: "Write a short, engaging, and poetic Instagram caption for this image in Arabic. Include 3 relevant hashtags. Keep it under 2 lines. Do not use quotes."
          }
        ]
      }
    });
    
    return response.text || "صورة جميلة! ✨";
  } catch (error) {
    console.error("Error generating caption:", error);
    return "لحظات لا تنسى ✨ #memories";
  }
};

export const suggestComments = async (postCaption: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate 3 short, positive, and relevant comments in Arabic for an Instagram post with this caption: "${postCaption}". Return them as a JSON array of strings only.`,
        config: {
            responseMimeType: "application/json"
        }
    });
    
    const text = response.text;
    if(!text) return ["رائع! 😍", "ما شاء الله", "جميل جداً"];
    
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : ["رائع! 😍", "ما شاء الله", "جميل جداً"];

  } catch (error) {
    return ["رائع! 😍", "ما شاء الله", "جميل جداً"];
  }
}
