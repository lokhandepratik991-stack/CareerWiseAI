'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating personalized career path suggestions
 * and job role recommendations based on a resume analysis report.
 *
 * - generateCareerRecommendations - The main function to call for career recommendations.
 * - GenerateCareerRecommendationsInput - The input type for the recommendation function.
 * - GenerateCareerRecommendationsOutput - The return type for the recommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ResumeAnalysisReportSchema = z.object({
  strengths: z.string().describe('Identified strengths from the resume.'),
  weaknesses: z.string().describe('Identified weaknesses or areas for improvement from the resume.'),
  extractedJobTitles: z.array(z.string()).describe('A list of job titles extracted from the resume.'),
  extractedSkills: z.array(z.string()).describe('A list of skills extracted from the resume.'),
  experienceSummary: z.string().describe('A summary of the user\'s work experience and achievements.'),
});

const GenerateCareerRecommendationsInputSchema = z.object({
  resumeAnalysisReport: ResumeAnalysisReportSchema.describe('A detailed report of the resume analysis.'),
});
export type GenerateCareerRecommendationsInput = z.infer<typeof GenerateCareerRecommendationsInputSchema>;

const CareerRecommendationsOutputSchema = z.object({
  careerPaths: z.array(
    z.object({
      name: z.string().describe('The name of the suggested career path.'),
      description: z.string().describe('A brief description of this career path and why it is suitable.'),
      growthOpportunities: z.array(z.string()).describe('Potential growth opportunities within this career path.'),
    })
  ).describe('A list of personalized career path suggestions.'),
  jobRoleRecommendations: z.array(
    z.object({
      title: z.string().describe('The title of the recommended job role.'),
      description: z.string().describe('A brief description of this job role.'),
      relevantSkills: z.array(z.string()).describe('Skills from the resume that are relevant to this role.'),
      keywords: z.array(z.string()).describe('Keywords to use when searching for this job role.'),
    })
  ).describe('A list of recommended job roles based on the resume analysis.'),
});
export type GenerateCareerRecommendationsOutput = z.infer<typeof CareerRecommendationsOutputSchema>;

export async function generateCareerRecommendations(input: GenerateCareerRecommendationsInput): Promise<GenerateCareerRecommendationsOutput> {
  return generateCareerRecommendationsFlow(input);
}

const careerAdvisorPrompt = ai.definePrompt({
  name: 'careerAdvisorPrompt',
  input: { schema: GenerateCareerRecommendationsInputSchema },
  output: { schema: CareerRecommendationsOutputSchema },
  prompt: `You are an expert career advisor. Your task is to provide personalized career path suggestions and job role recommendations based on the provided resume analysis report.

Consider the user's strengths, identified job titles, skills, and experience summary to give relevant and actionable advice.

Resume Analysis Report:
Strengths: {{{resumeAnalysisReport.strengths}}}
Weaknesses: {{{resumeAnalysisReport.weaknesses}}}
Extracted Job Titles: {{#each resumeAnalysisReport.extractedJobTitles}}- {{{this}}}\n{{/each}}
Extracted Skills: {{#each resumeAnalysisReport.extractedSkills}}- {{{this}}}\n{{/each}}
Experience Summary: {{{resumeAnalysisReport.experienceSummary}}}

Based on this analysis, generate:
1. A list of 2-3 suitable career paths, each with a name, description, and potential growth opportunities.
2. A list of 3-5 specific job role recommendations, each with a title, a brief description, relevant skills from the user's resume, and keywords for job searching.

Ensure your recommendations are encouraging and clearly linked to the provided resume analysis.`,
});

const generateCareerRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateCareerRecommendationsFlow',
    inputSchema: GenerateCareerRecommendationsInputSchema,
    outputSchema: CareerRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await careerAdvisorPrompt(input);
    return output!;
  }
);
