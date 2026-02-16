import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

// Use the standard stable model for analysis.
// This identifier is the most reliable for the Google AI plugin.
export const defaultModel = 'googleai/gemini-1.5-flash';
