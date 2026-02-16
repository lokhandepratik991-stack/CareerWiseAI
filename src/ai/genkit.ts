import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

// Use the standard stable model for analysis
export const defaultModel = 'googleai/gemini-1.5-flash';
