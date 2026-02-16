import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

// Standard stable model identifier for enterprise-grade analysis
export const defaultModel = 'googleai/gemini-1.5-flash';
