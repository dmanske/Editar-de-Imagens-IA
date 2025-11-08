import { GoogleGenAI, Type, Modality, Part } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const base64ToPart = (base64Data: string): Part => {
    const match = base64Data.match(/^data:(image\/.+);base64,(.+)$/);
    if (!match) {
        throw new Error("Formato de dados de imagem base64 inválido.");
    }
    return {
        inlineData: {
            mimeType: match[1],
            data: match[2],
        },
    };
};

export const generateImages = async (prompt: string, numImages: number, base64Image?: string | null, style?: string, aspectRatio: string = '1:1'): Promise<string[]> => {
    try {
        const fullPrompt = style ? `${prompt}, no estilo ${style}` : prompt;

        if (base64Image) {
            // Use o modelo multimodal para prompts de imagem + texto
            const imagePart = base64ToPart(base64Image);
            
            // Instrução flexível que lida com transformações de estilo e edições específicas.
            const editingPrompt = `Sua tarefa é editar a imagem fornecida com base no prompt do usuário: '${fullPrompt}'. Analise o pedido cuidadosamente. Se for uma transformação de estilo (ex: 'transforme em um desenho a lápis'), recrie a imagem inteira nesse novo estilo. Se for uma edição específica (ex: 'adicione um chapéu de pirata'), modifique a imagem para incluir esse elemento de forma realista. Mantenha a essência da imagem original, a menos que o prompt peça uma mudança completa. A imagem final deve ter a proporção de ${aspectRatio}.`;
            const textPart = { text: editingPrompt };
            
            const generateSingleImage = async () => {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-image',
                    contents: { parts: [imagePart, textPart] },
                    config: {
                        responseModalities: [Modality.IMAGE],
                    },
                });

                for (const part of response.candidates?.[0]?.content?.parts ?? []) {
                    if (part.inlineData) {
                        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    }
                }
                throw new Error("A API não retornou uma parte de imagem.");
            };
            
            const imagePromises = Array(numImages).fill(0).map(() => generateSingleImage());
            return await Promise.all(imagePromises);

        } else {
            // Use o Imagen para texto-para-imagem de alta qualidade
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: fullPrompt,
                config: {
                    numberOfImages: Math.max(1, Math.min(8, numImages)),
                    outputMimeType: 'image/jpeg',
                    aspectRatio: aspectRatio,
                },
            });

            if (!response.generatedImages || response.generatedImages.length === 0) {
                throw new Error("A API não retornou nenhuma imagem.");
            }
            
            return response.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);
        }
    } catch (error) {
        console.error("Error generating images:", error);
        throw new Error("Falha ao gerar imagens. Verifique seu prompt ou chave de API.");
    }
};

export const getPromptIdeas = async (prompt: string, base64Image?: string | null): Promise<string[]> => {
    try {
        let generationPrompt = `Based on the user's prompt: "${prompt}"`;
        if (base64Image) {
            generationPrompt += ` and the provided image, generate 3 alternative, more detailed, and creative prompts for an AI image generator. Focus on adding specifics about style, lighting, composition, and mood inspired by both the text and the image.`;
        } else {
            generationPrompt += `, generate 3 alternative, more detailed, and creative prompts for an AI image generator. Focus on adding specifics about style, lighting, composition, and mood.`;
        }
        generationPrompt += ` The response must be a valid JSON array of strings.`

        const parts: Part[] = [{ text: generationPrompt }];
        if (base64Image) {
            parts.unshift(base64ToPart(base64Image));
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING,
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        const ideas = JSON.parse(jsonText);
        
        if (Array.isArray(ideas) && ideas.every(item => typeof item === 'string')) {
            return ideas;
        } else {
            throw new Error("Formato inválido para ideias de prompt recebidas da API.");
        }

    } catch (error) {
        console.error("Error getting prompt ideas:", error);
        throw new Error("Falha ao obter ideias de prompt. O modelo pode não conseguir processar esta solicitação.");
    }
};

export const improvePrompt = async (prompt: string, base64Image?: string | null): Promise<string> => {
    try {
        let generationPrompt = `Rewrite and enhance the following user's prompt for an AI image generator to be more vivid, detailed, and evocative. Focus on visual descriptions of subjects, environments, lighting, and artistic style. Return only the single, improved prompt as a string, without any additional text, labels, or formatting.`;
        if (base64Image) {
            generationPrompt += ` The new prompt should also be inspired by the provided image.`;
        }
        generationPrompt += `\n\nUser's prompt: "${prompt}"`;

        const parts: Part[] = [{ text: generationPrompt }];
        if (base64Image) {
            parts.unshift(base64ToPart(base64Image));
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts },
        });
        
        return response.text.trim();

    } catch (error) {
        console.error("Error improving prompt:", error);
        throw new Error("Falha ao aprimorar o prompt. O modelo pode não conseguir processar esta solicitação.");
    }
};