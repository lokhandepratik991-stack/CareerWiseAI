import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai'; // Import the model constant

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY, // Ensure your API key is correctly passed
    }),
  ],
  model: gemini15Flash, // Set the default model here
});

// Use the constant instead of a string to prevent 404 errors
export const defaultModel = gemini15Flash;