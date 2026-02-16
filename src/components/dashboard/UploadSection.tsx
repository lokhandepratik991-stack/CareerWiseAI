"use client";

import { useState, useRef } from 'react';
import { FileText, Loader2, Sparkles, BrainCircuit, Rocket, Zap, Upload, FileUp, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { performDeepAnalysis, type DeepAnalysisOutput } from '@/ai/flows/deep-analysis-flow';
import type { AnalyzeResumeContentOutput } from '@/ai/flows/analyze-resume-content-flow';
import type { ResumeFeedbackReportOutput } from '@/ai/flows/generate-resume-feedback-report';
import type { GenerateCareerRecommendationsOutput } from '@/ai/flows/generate-career-recommendations';

interface UploadSectionProps {
  onResults: (
    analysis: AnalyzeResumeContentOutput,
    feedback: ResumeFeedbackReportOutput,
    career: GenerateCareerRecommendationsOutput
  ) => void;
  onDeepResults?: (output: DeepAnalysisOutput) => void;
}

export function UploadSection({ onResults, onDeepResults }: UploadSectionProps) {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isParsingPDF, setIsParsingPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsParsingPDF(true);
    try {
      const pdfjs = await import('pdfjs-dist');
      // Use the correct .mjs worker path for latest pdf.js
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .filter((item: any) => 'str' in item)
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      setResumeText(fullText.trim());
      toast({
        title: "Extraction Successful",
        description: "Resume content captured. You can now execute the scan.",
      });
    } catch (error: any) {
      console.error("PDF Parsing error:", error);
      toast({
        title: "Extraction Failed",
        description: "Failed to parse PDF. Please try pasting manual text.",
        variant: "destructive",
      });
    } finally {
      setIsParsingPDF(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "Input Required",
        description: "Please upload a PDF or paste your resume content.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const output = await performDeepAnalysis({ resumeText });
      if (onDeepResults) {
        onDeepResults(output);
      } else {
        onResults(output.analysis, output.feedback, output.career);
      }
      toast({
        title: "Scan Successful",
        description: "Neural career analysis complete.",
      });
    } catch (error: any) {
      console.error("Analysis failed", error);
      toast({
        title: "Processing Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
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
          Upload your professional history for deep algorithmic analysis.
        </p>
      </div>

      <Card className="border border-slate-200 bg-white shadow-2xl rounded-[2rem] overflow-hidden animate-reveal">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg text-white">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold tracking-tight">Intelligence Input</CardTitle>
                <CardDescription className="text-sm font-medium text-slate-500 mt-1">
                  Upload a PDF or paste text manually.
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".pdf" 
                className="hidden" 
              />
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isParsingPDF || isAnalyzing}
                className="rounded-full gap-2 text-xs font-black uppercase tracking-widest border-slate-200 shadow-sm px-6 h-11"
              >
                {isParsingPDF ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <FileUp className="h-3.5 w-3.5" />
                )}
                Upload PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative">
            <Textarea 
              placeholder="Paste your resume content here..."
              className="min-h-[400px] resize-none border-slate-200 focus-visible:ring-primary text-base p-8 bg-slate-50/30 rounded-2xl"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-10">
            <Button 
              size="lg" 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !resumeText.trim()}
              className="h-16 px-16 text-sm font-black uppercase tracking-widest rounded-full shadow-2xl shadow-primary/30 gap-3 transition-all hover:scale-[1.02]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
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
    </div>
  );
}
