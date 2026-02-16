'use server';
/**
 * @fileOverview A Genkit flow for generating a comprehensive resume feedback report.
 *
 * - generateResumeFeedbackReport - A function that generates a detailed feedback report for a resume.
 * - ResumeAnalysisInput - The input type for the generateResumeFeedbackReport function.
 * - ResumeFeedbackReportOutput - The return type for the generateResumeFeedbackReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ResumeAnalysisInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the resume.'),
  extractedKeywords: z.array(z.string()).describe('An array of key skills and terms extracted from the resume.'),
  extractedExperienceSummary: z.array(z.string()).describe('An array of summarized work experience entries from the resume.'),
  extractedEducationSummary: z.array(z.string()).describe('An array of summarized education entries from the resume.'),
});
export type ResumeAnalysisInput = z.infer<typeof ResumeAnalysisInputSchema>;

const ResumeFeedbackReportOutputSchema = z.object({
  overallSummary: z.string().describe('A concise overall summary of the resume, highlighting its general effectiveness and impact.'),
  strengths: z.array(z.object({
    title: z.string().describe('A brief title for the strength (e.g., "Strong Action Verbs", "Relevant Experience").'),
    description: z.string().describe('A detailed explanation of the strength, providing specific examples from the resume where possible.'),
  })).describe('An array of detailed strengths identified in the resume.'),
  weaknesses: z.array(z.object({
    title: z.string().describe('A brief title for the weakness (e.g., "Lack of Quantifiable Achievements", "Poor Formatting").'),
    description: z.string().describe('A detailed explanation of the weakness, providing specific examples and why it hinders the resume.'),
  })).describe('An array of detailed weaknesses identified in the resume.'),
  suggestions: z.array(z.object({
    title: z.string().describe('A brief title for the suggestion (e.g., "Add Metrics", "Improve Readability").'),
    description: z.string().describe('A concrete and actionable suggestion for improvement, explaining how to implement it.'),
  })).describe('An array of concrete suggestions for improving the resume.'),
});
export type ResumeFeedbackReportOutput = z.infer<typeof ResumeFeedbackReportOutputSchema>;

export async function generateResumeFeedbackReport(input: ResumeAnalysisInput): Promise<ResumeFeedbackReportOutput> {
  return generateResumeFeedbackReportFlow(input);
}

const generateResumeFeedbackReportPrompt = ai.definePrompt({
  name: 'generateResumeFeedbackReportPrompt',
  input: { schema: ResumeAnalysisInputSchema },
  output: { schema: ResumeFeedbackReportOutputSchema },
  prompt: `You are an expert career advisor and resume analyst. Your task is to provide a comprehensive, detailed, and constructive feedback report on a given resume.
Analyze the resume content thoroughly, identify its strengths and weaknesses, and provide actionable suggestions for improvement.

Use the following extracted information and the full resume text for your analysis.

Resume Text:
\`\`\`
{{{resumeText}}}
\`\`\`

Extracted Keywords: {{{extractedKeywords}}}
Extracted Experience Summary: {{{extractedExperienceSummary}}}
Extracted Education Summary: {{{extractedEducationSummary}}}

Based on this information, generate a JSON object with the following structure:
- 'overallSummary': A concise overall summary of the resume's general effectiveness and impact.
- 'strengths': An array of objects, each with 'title' (a brief title for the strength) and 'description' (a detailed explanation, with specific examples from the resume).
- 'weaknesses': An array of objects, each with 'title' (a brief title for the weakness) and 'description' (a detailed explanation, with specific examples and why it hinders the resume).
- 'suggestions': An array of objects, each with 'title' (a brief title for the suggestion) and 'description' (a concrete and actionable suggestion for improvement, explaining how to implement it).

Ensure that your analysis is objective, professional, and directly tied to the content provided. Provide at least 3-5 items for strengths, weaknesses, and suggestions if applicable. If a category has fewer items, state what you found.`,
});

const generateResumeFeedbackReportFlow = ai.defineFlow(
  {
    name: 'generateResumeFeedbackReportFlow',
    inputSchema: ResumeAnalysisInputSchema,
    outputSchema: ResumeFeedbackReportOutputSchema,
  },
  async (input) => {
    const { output } = await generateResumeFeedbackReportPrompt(input);
    return output!;
  }
);
