'use server';
/**
 * @fileOverview This file implements a Genkit flow for analyzing resume content.
 *
 * - analyzeResumeContent - A function that extracts and categorizes skills, experience, and education from a resume.
 * - AnalyzeResumeContentInput - The input type for the analyzeResumeContent function.
 * - AnalyzeResumeContentOutput - The return type for the analyzeResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeContentInputSchema = z.object({
  resumeText: z.string().describe('The extracted text content of the resume.'),
});
export type AnalyzeResumeContentInput = z.infer<typeof AnalyzeResumeContentInputSchema>;

const AnalyzeResumeContentOutputSchema = z.object({
  skills: z.array(z.string()).describe('A list of key skills extracted from the resume.'),
  experience: z
    .array(
      z.object({
        jobTitle: z.string().describe('The title of the job role (e.g., "Software Engineer").'),
        company: z.string().describe('The company where the job was held.'),
        duration: z.string().describe('The duration of the role (e.g., "Jan 2020 - Dec 2022").'),
        summary: z.string().describe('A brief summary of responsibilities and achievements in this role.'),
      })
    )
    .describe('A list of work experiences, each with job title, company, duration, and a summary.'),
  education: z
    .array(
      z.object({
        degree: z.string().describe('The degree obtained (e.g., "M.S.", "B.A.").'),
        fieldOfStudy: z.string().describe('The field of study (e.g., "Computer Science").'),
        institution: z.string().describe('The name of the educational institution.'),
        graduationDate: z.string().describe('The graduation date or attendance period (e.g., "May 2023", "2018 - 2022").'),
      })
    )
    .describe('A list of educational background entries, each with degree, field of study, institution, and graduation date.'),
  overallSummary: z.string().describe('A concise summary highlighting the key strengths and professional profile based on the resume content.'),
});
export type AnalyzeResumeContentOutput = z.infer<typeof AnalyzeResumeContentOutputSchema>;

export async function analyzeResumeContent(
  input: AnalyzeResumeContentInput
): Promise<AnalyzeResumeContentOutput> {
  return analyzeResumeContentFlow(input);
}

const analyzeResumeContentPrompt = ai.definePrompt({
  name: 'analyzeResumeContentPrompt',
  input: {schema: AnalyzeResumeContentInputSchema},
  output: {schema: AnalyzeResumeContentOutputSchema},
  prompt: `You are an expert career advisor specializing in resume analysis. Your task is to meticulously review the provided resume text and extract the following information, categorizing it precisely into the specified JSON structure.

Resume Text:
{{{resumeText}}}

Extract:
1.  **Skills**: List all prominent skills, separated as individual strings.
2.  **Experience**: For each work experience entry:
    *   'jobTitle': The exact job title.
    *   'company': The name of the company.
    *   'duration': The period of employment (e.g., "Jan 2020 - Dec 2022").
    *   'summary': A concise paragraph summarizing key responsibilities and achievements.
3.  **Education**: For each educational entry:
    *   'degree': The degree obtained (e.g., "Bachelor of Science").
    *   'fieldOfStudy': The academic field (e.g., "Computer Engineering").
    *   'institution': The name of the university or institution.
    *   'graduationDate': The graduation date or attendance period (e.g., "May 2023").
4.  **Overall Summary**: A concise, 3-5 sentence professional summary highlighting the candidate's main qualifications and career goals derived from the resume.

Ensure the output is a valid JSON object matching the requested structure.`,
});

const analyzeResumeContentFlow = ai.defineFlow(
  {
    name: 'analyzeResumeContentFlow',
    inputSchema: AnalyzeResumeContentInputSchema,
    outputSchema: AnalyzeResumeContentOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumeContentPrompt(input);
    return output!;
  }
);
