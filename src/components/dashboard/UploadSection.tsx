
"use client";

import { useState } from 'react';
import { FileText, Upload, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeResumeContent, type AnalyzeResumeContentOutput } from '@/ai/flows/analyze-resume-content-flow';
import { generateResumeFeedbackReport, type ResumeFeedbackReportOutput } from '@/ai/flows/generate-resume-feedback-report';
import { generateCareerRecommendations, type GenerateCareerRecommendationsOutput } from '@/ai/flows/generate-career-recommendations';

interface UploadSectionProps {
  onResults: (
    analysis: AnalyzeResumeContentOutput,
    feedback: ResumeFeedbackReportOutput,
    career: GenerateCareerRecommendationsOutput
  ) => void;
}

export function UploadSection({ onResults }: UploadSectionProps) {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    try {
      // Step 1: Analyze core content
      const analysis = await analyzeResumeContent({ resumeText });
      
      // Step 2: Generate feedback report
      const feedback = await generateResumeFeedbackReport({
        resumeText,
        extractedKeywords: analysis.skills,
        extractedExperienceSummary: analysis.experience.map(e => `${e.jobTitle} at ${e.company}`),
        extractedEducationSummary: analysis.education.map(ed => `${ed.degree} from ${ed.institution}`),
      });

      // Step 3: Generate career recommendations
      const career = await generateCareerRecommendations({
        resumeAnalysisReport: {
          strengths: feedback.strengths.map(s => s.title).join(', '),
          weaknesses: feedback.weaknesses.map(w => w.title).join(', '),
          extractedJobTitles: analysis.experience.map(e => e.jobTitle),
          extractedSkills: analysis.skills,
          experienceSummary: analysis.overallSummary
        }
      });

      onResults(analysis, feedback, career);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-headline text-primary">Unlock Your Professional Potential</h1>
        <p className="text-muted-foreground">Paste your resume content below to receive comprehensive AI analysis and career guidance.</p>
      </div>

      <Card className="border-2 border-dashed border-primary/20 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Resume Content
          </CardTitle>
          <CardDescription>
            For the best results, copy and paste the full text of your current resume.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="Paste your resume here..."
            className="min-h-[300px] resize-none focus-visible:ring-primary/50"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button 
              size="lg" 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !resumeText.trim()}
              className="gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Career Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 rounded-xl bg-white border shadow-sm space-y-2">
          <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Simple Input</h3>
          <p className="text-sm text-muted-foreground">Easy copy-paste interface for instant analysis.</p>
        </div>
        <div className="p-6 rounded-xl bg-white border shadow-sm space-y-2">
          <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Smart Parsing</h3>
          <p className="text-sm text-muted-foreground">Advanced AI identifies your core skills and experience.</p>
        </div>
        <div className="p-6 rounded-xl bg-white border shadow-sm space-y-2">
          <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Career Roadmap</h3>
          <p className="text-sm text-muted-foreground">Get personalized suggestions for your next career move.</p>
        </div>
      </div>
    </div>
  );
}
