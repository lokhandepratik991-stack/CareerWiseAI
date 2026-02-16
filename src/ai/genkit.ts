import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

// Using the stable Gemini 1.5 Flash model identifier
export const defaultModel = 'gemini-1.5-flash';
