import { type FormData } from "@/app/start/page";

export const promptToAi = (goal: 'portfolio' | 'landing',formData: FormData) =>{    
    const prompt = `
        You are an expert front-end developer.

        Goal: Generate a html, tailwind.css (cdn) for a ${goal} based on the following data.

        Instructions:
        - Output only valid raw code (not JSON, not escaped).
        - add things in your mind
        - Do NOT wrap the code in triple backticks.
        - Do NOT escape any characters (no \\, \", \\n).
        - The response should be a complete, valid html code using TailwindCSS.
        - Output only the raw code as a plain string.

        Data:
        ${JSON.stringify(formData, null, 2)}

        Now generate the code:
        `;
    
    return prompt;
}