import { GoogleGenAI, Modality, Content } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable is not set. The app will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const editImageWithGemini = async (
    base64ImageData: string,
    mimeType: string,
    prompt: string
): Promise<string> => {
    try {
        const enhancedPrompt = `User prompt: "${prompt}".

Instructions for AI: Please apply the user's edit creatively. Also, enhance the final image to ensure it is high-resolution, with realistic lighting, sharp focus, and overall clarity. Avoid any AI-generated glitches, artifacts, or blurriness. The final result should look realistic and high-quality.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: enhancedPrompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }

        throw new Error("No image data found in the Gemini response.");

    } catch (error) {
        console.error("Error editing image with Gemini:", error);
        throw new Error("Failed to transform the image. Please try again.");
    }
};

export const chatWithGemini = async (history: Content[], newMessage: string): Promise<string> => {
    try {
        const chatHistory = [
            ...history,
            { role: 'user', parts: [{ text: newMessage }] }
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: chatHistory,
            config: {
                systemInstruction: "You are a helpful and creative AI assistant for an image editing app called Neno Banana Dark Studio X. Provide concise and useful suggestions for improving photos, generating creative ideas, or explaining editing concepts. Keep responses to a few sentences.",
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error chatting with Gemini:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
};