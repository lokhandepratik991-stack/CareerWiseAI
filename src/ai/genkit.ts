import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

// Using the standard stable model identifier for Google AI
export const defaultModel = 'googleai/gemini-1.5-flash';
