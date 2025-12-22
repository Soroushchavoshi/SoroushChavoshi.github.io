
import { GoogleGenAI, Chat, GenerateContentResponse, Tool, FunctionDeclaration, Type } from "@google/genai";

let ai: GoogleGenAI | null = null;

// Initialize automatically if process.env is available (Development/AI Studio)
try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (e) {
  console.warn("Environment API Key not found, waiting for manual input.");
}

export const initializeGemini = (apiKey: string) => {
  if (!apiKey) return;
  ai = new GoogleGenAI({ apiKey });
  chatSession = null; // Reset session when key changes
};

export const isGeminiInitialized = (): boolean => {
  return !!ai;
};

const SYSTEM_INSTRUCTION = `
You are "Soroush AI", a virtual assistant for Soroush Chavoshi's portfolio website.
Soroush is a world-class Digital Product Designer based in Tehran/Remote.

Key Info about Soroush:
- Experience: 8+ years in product design.
- Tools: Figma, Principle, React, Webflow.
- Availability: Currently open for select freelance projects.
- Contact: soroush.chavosh@gmail.com

Tone: Professional, concise, slightly witty.
Keep responses relatively short.

CRITICAL INSTRUCTION:
At the end of every response, you MUST use the 'suggestActions' tool to provide 2 or 3 short, relevant follow-up conversation options.
- If the user just said hello, suggest "View Work" or "Contact Soroush".
- If talking about a project, suggest "Next Project" or "Process details".
- Keep the suggestions short (max 4-5 words).
- If the user speaks Persian, provide Persian suggestions.
`;

// --- Tool Definitions ---

const suggestActionsTool: FunctionDeclaration = {
  name: "suggestActions",
  description: "Updates the UI suggestion chips with relevant follow-up actions.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      labels: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of 2-3 short text labels for the buttons (e.g. 'View Work', 'Contact').",
      },
    },
    required: ["labels"],
  },
};

// Removed agentic tools (changeTheme, scrollToSection, sendEmail) as requested
const tools: Tool[] = [
  {
    functionDeclarations: [suggestActionsTool],
  },
];

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!ai) {
    throw new Error("Gemini API is not initialized. Please provide an API Key.");
  }
  
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: tools, 
      },
    });
  }
  return chatSession;
};

export const resetSession = () => {
  chatSession = null;
};

// Custom response type to handle mixed text/tool outputs in the UI
export interface GeminiStreamResult {
  text?: string;
  functionCall?: {
    name: string;
    args: any;
    id: string;
  };
}

export const sendMessageToGemini = async (message: string): Promise<AsyncGenerator<GeminiStreamResult, void, unknown>> => {
  // Ensure initialized
  if (!ai) {
      throw new Error("API_KEY_MISSING");
  }

  const session = getChatSession();
  
  try {
    const result = await session.sendMessageStream({ message });
    
    return (async function* () {
      for await (const chunk of result) {
        // Handle Text
        if (chunk.text) {
          yield { text: chunk.text };
        }
        
        // Handle Function Calls
        // The SDK might return functionCalls within the candidates
        // We check specifically for functionCalls in the chunk
        const fc = chunk.functionCalls?.[0];
        if (fc) {
             yield { 
               functionCall: {
                 name: fc.name,
                 args: fc.args,
                 id: fc.id
               }
             };
        }
      }
    })();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

// Helper to send the result of the tool back to Gemini so it can continue conversation
export const sendToolResponseToGemini = async (functionId: string, functionName: string, result: any): Promise<GenerateContentResponse> => {
    const session = getChatSession();
    // We need to use the raw API to send a tool response part
    
    const response = await session.sendMessage({
        message: [
            {
                functionResponse: {
                    name: functionName,
                    response: { result: result },
                    id: functionId
                }
            }
        ]
    });
    return response;
}
