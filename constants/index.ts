import { type FormData } from "@/app/start/page";

export const promptToAi = (goal: 'portfolio' | 'landing',formData: FormData) =>{    
    const prompt = `
       You are an expert front-end developer and UI/UX designer. 
        Based on the following structured JSON data, generate a fully responsive, modern website. Use Tailwind CSS for styling, React with TypeScript ('.tsx'), and clean component structure.

        The website goal is: ${goal}  
        Use modern design trends and semantic HTML. Optimize for performance and accessibility.
        Generate the full React component code for a portfolio page. Do not wrap it in triple backticks. Output only the raw code, without markdown formatting.

        Data:
        ${JSON.stringify(formData, null, 2)}

        Instructions:
        - Use JSX/TSX (React with TypeScript)
        - Use TailwindCSS for layout, fonts, spacing, responsiveness, and colors
        - Include meaningful section names (e.g., Hero, About, Projects, Testimonials)
        - Do not include any explanations, only return a single '.tsx' file with the full page layout
        - Use placeholders for images and links if needed
        - If arrays are empty or missing, omit those sections

        Now generate the complete code:
    `;
    
    return prompt;
}