
"use client";

import { useState } from 'react';
import { FileText, Upload, Loader2, Sparkles, Rocket, BrainCircuit } from 'lucide-react';
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
      const analysis = await analyzeResumeContent({ resumeText });
      
      const feedback = await generateResumeFeedbackReport({
        resumeText,
        extractedKeywords: analysis.skills,
        extractedExperienceSummary: analysis.experience.map(e => `${e.jobTitle} at ${e.company}`),
        extractedEducationSummary: analysis.education.map(ed => `${ed.degree} from ${ed.institution}`),
      });

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
    <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-primary">
          Deep Resume Scan
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
          Our neural engine will dissect your resume and uncover your true professional potential.
        </p>
      </div>

      <Card className="border-2 border-dashed border-primary/30 bg-white/50 backdrop-blur-sm shadow-2xl rounded-[2.5rem] overflow-hidden group hover:border-primary transition-all duration-500">
        <CardHeader className="bg-primary/5 pb-10">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="bg-primary p-2 rounded-xl text-white">
              <BrainCircuit className="h-6 w-6" />
            </div>
            Resume Content Engine
          </CardTitle>
          <CardDescription className="text-base">
            Copy and paste your full resume text. Our AI ignores formatting and focuses purely on your value.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0 -mt-6">
          <div className="relative">
            <Textarea 
              placeholder="Paste your professional narrative here..."
              className="min-h-[400px] resize-none border-2 border-transparent focus-visible:ring-primary/50 text-lg p-6 bg-white rounded-3xl shadow-inner transition-all duration-300"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            {!resumeText.trim() && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                <FileText className="h-32 w-32 text-primary" />
              </div>
            )}
          </div>
          <div className="flex justify-center mt-10">
            <Button 
              size="lg" 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !resumeText.trim()}
              className="h-16 px-16 text-xl rounded-full shadow-2xl shadow-primary/40 gap-3 bg-gradient-to-r from-primary to-purple-600 border-none hover:scale-105 transition-all duration-300"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Processing Intelligence...
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6" />
                  Generate AI Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white border shadow-lg hover:shadow-xl transition-all duration-300 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <Upload className="h-7 w-7 text-primary group-hover:text-white" />
          </div>
          <h3 className="text-xl font-bold">1. Zero Friction</h3>
          <p className="text-muted-foreground leading-relaxed">No complex file uploads. Just text. Clean and efficient.</p>
        </div>
        <div className="p-8 rounded-3xl bg-white border shadow-lg hover:shadow-xl transition-all duration-300 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
            <BrainCircuit className="h-7 w-7 text-secondary group-hover:text-white" />
          </div>
          <h3 className="text-xl font-bold">2. Smart Parse</h3>
          <p className="text-muted-foreground leading-relaxed">Multimodal LLM extraction identifies every relevant skill and milestone.</p>
        </div>
        <div className="p-8 rounded-3xl bg-white border shadow-lg hover:shadow-xl transition-all duration-300 space-y-4 group">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
            <Rocket className="h-7 w-7 text-purple-600 group-hover:text-white" />
          </div>
          <h3 className="text-xl font-bold">3. Launch Pad</h3>
          <p className="text-muted-foreground leading-relaxed">Instant career pathing based on your unique profile data.</p>
        </div>
      </div>
    </div>
  );
}
