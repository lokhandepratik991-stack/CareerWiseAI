import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

// Using the stable Gemini 1.5 Flash model for reliability
export const defaultModel = 'googleai/gemini-1.5-flash';
