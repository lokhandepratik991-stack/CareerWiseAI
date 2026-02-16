"use client";

import { useState } from 'react';
import { FileText, Loader2, Sparkles, BrainCircuit, Rocket, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { performDeepAnalysis } from '@/ai/flows/deep-analysis-flow';
import type { AnalyzeResumeContentOutput } from '@/ai/flows/analyze-resume-content-flow';
import type { ResumeFeedbackReportOutput } from '@/ai/flows/generate-resume-feedback-report';
import type { GenerateCareerRecommendationsOutput } from '@/ai/flows/generate-career-recommendations';

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
      // Perform a single unified analysis flow for maximum speed
      const { analysis, feedback, career } = await performDeepAnalysis({ resumeText });
      onResults(analysis, feedback, career);
    } catch (error) {
      console.error("Deep analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-12">
      <div className="text-center space-y-4 animate-reveal">
        <h1 className="text-5xl font-extrabold tracking-tighter text-slate-900">
          Professional Neural Scan
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Upload your professional history for deep algorithmic analysis and strategic pathing.
        </p>
      </div>

      <Card className="border border-slate-200 bg-white shadow-2xl rounded-[2rem] overflow-hidden animate-reveal [animation-delay:100ms]">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-lg text-white">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">Intelligence Input</CardTitle>
              <CardDescription className="text-sm font-medium text-slate-500 mt-1">
                Raw text extraction for multidimensional processing.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative group">
            <Textarea 
              placeholder="Paste the full text of your resume or CV here..."
              className="min-h-[450px] resize-none border-slate-200 focus-visible:ring-primary focus-visible:border-primary text-base p-8 bg-slate-50/30 rounded-2xl transition-all"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            {!resumeText.trim() && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <FileText className="h-48 w-48 text-slate-900" />
              </div>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <Button 
              size="lg" 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !resumeText.trim()}
              className="h-14 px-12 text-sm font-bold uppercase tracking-widest rounded-full shadow-xl shadow-primary/20 gap-3 transition-all hover:scale-[1.02]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Neural Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Execute Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-reveal [animation-delay:200ms]">
        {[
          { icon: Zap, title: "Efficiency", desc: "Proprietary text extraction bypasses formatting hurdles." },
          { icon: BrainCircuit, title: "Precision", desc: "Multimodal LLM mapping identifies core competencies." },
          { icon: Rocket, title: "Velocity", desc: "Accelerate your professional trajectory in minutes." }
        ].map((item, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
