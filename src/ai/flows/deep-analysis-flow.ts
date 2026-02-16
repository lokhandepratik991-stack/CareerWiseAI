'use server';
/**
 * @fileOverview A unified Genkit flow that performs a complete, deep analysis of a resume in a single pass.
 */

import { ai, defaultModel } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeResumeContentOutputSchema = z.object({
  skills: z.array(z.string()).describe('A list of key skills extracted from the resume.'),
  experience: z.array(z.object({
    jobTitle: z.string().describe('The title of the job role.'),
    company: z.string().describe('The company name.'),
    duration: z.string().describe('The duration of the role.'),
    summary: z.string().describe('A brief summary of responsibilities and achievements.'),
  })),
  education: z.array(z.object({
    degree: z.string().describe('The degree obtained.'),
    fieldOfStudy: z.string().describe('The field of study.'),
    institution: z.string().describe('The name of the institution.'),
    graduationDate: z.string().describe('The graduation date.'),
  })),
  overallSummary: z.string().describe('A concise professional summary.'),
});

const ResumeFeedbackReportOutputSchema = z.object({
  overallSummary: z.string().describe('Overall effectiveness of the resume.'),
  strengths: z.array(z.object({
    title: z.string().describe('Brief title for the strength.'),
    description: z.string().describe('Detailed explanation.'),
  })),
  weaknesses: z.array(z.object({
    title: z.string().describe('Brief title for the weakness.'),
    description: z.string().describe('Detailed explanation.'),
  })),
  suggestions: z.array(z.object({
    title: z.string().describe('Brief title for the suggestion.'),
    description: z.string().describe('Actionable advice.'),
  })),
});

const CareerRecommendationsOutputSchema = z.object({
  careerPaths: z.array(z.object({
    name: z.string().describe('Name of the career path.'),
    description: z.string().describe('Why it is suitable.'),
    growthOpportunities: z.array(z.string()),
  })),
  jobRoleRecommendations: z.array(z.object({
    title: z.string().describe('Recommended job title.'),
    description: z.string().describe('Brief job description.'),
    relevantSkills: z.array(z.string()),
    keywords: z.array(z.string()),
  })),
});

const DeepAnalysisInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the resume.'),
});
export type DeepAnalysisInput = z.infer<typeof DeepAnalysisInputSchema>;

const DeepAnalysisOutputSchema = z.object({
  analysis: AnalyzeResumeContentOutputSchema,
  feedback: ResumeFeedbackReportOutputSchema,
  career: CareerRecommendationsOutputSchema,
  revisedResumeMarkdown: z.string().describe('A complete, professionally rewritten version of the resume in Markdown format.'),
});
export type DeepAnalysisOutput = z.infer<typeof DeepAnalysisOutputSchema>;

export async function performDeepAnalysis(input: DeepAnalysisInput): Promise<DeepAnalysisOutput> {
  return deepAnalysisFlow(input);
}

const deepAnalysisPrompt = ai.definePrompt({
  name: 'deepAnalysisPrompt',
  model: defaultModel,
  input: { schema: DeepAnalysisInputSchema },
  output: { schema: DeepAnalysisOutputSchema },
  prompt: `You are an elite career intelligence system. Perform a comprehensive analysis of the provided resume text.

Resume Text:
"""
{{{resumeText}}}
"""

Your response must include structural extraction, an executive audit, strategic career recommendations, and a professional Markdown revision. Be precise and professional.`,
});

const deepAnalysisFlow = ai.defineFlow(
  {
    name: 'deepAnalysisFlow',
    inputSchema: DeepAnalysisInputSchema,
    outputSchema: DeepAnalysisOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await deepAnalysisPrompt(input);
      if (!output) {
        throw new Error('Intelligence engine failed to generate response content.');
      }
      return output;
    } catch (error: any) {
      const message = error.message || '';
      
      // Handle quota issues
      if (message.includes('429') || message.includes('quota') || message.includes('RESOURCE_EXHAUSTED')) {
        throw new Error('Intelligence quota reached. Please wait about 60 seconds before trying again.');
      }
      
      // Handle model availability or configuration issues
      if (message.includes('404') || message.includes('not found')) {
        throw new Error('Intelligence model configuration issue. Please ensure your API key is active and supports Gemini 1.5 Flash.');
      }
      
      throw new Error(message || 'An unexpected error occurred during deep analysis.');
    }
  }
);
