
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let aiInstance: GoogleGenAI | undefined;

function getInitializedAi() {
    if (!aiInstance) {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error("API_KEY environment variable not set. Please configure it in your environment to use the AI features.");
        }
        aiInstance = new GoogleGenAI({ apiKey });
    }
    return aiInstance;
}


/**
 * Generates content using the Gemini API.
 * @param prompt The prompt to send to the model.
 * @returns The generated text content.
 * @throws An error if API key is missing or if the API call fails.
 */
export const generateContent = async (prompt: string): Promise<string> => {
    const ai = getInitializedAi();
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content:", error);
        // Re-throw a more user-friendly error
        if (error instanceof Error) {
            throw new Error(`Failed to generate content: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the AI.");
    }
};
