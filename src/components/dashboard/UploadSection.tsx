"use client";

import { useState, useRef } from 'react';
import { FileUp, Loader2, Sparkles, BrainCircuit, AlertCircle, FileText } from 'lucide-react';
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
      // Use standard CDN import for worker compatibility
      const pdfjs = await import('pdfjs-dist');
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
        description: "Resume content captured from PDF.",
      });
    } catch (error: any) {
      console.error("PDF Parsing error:", error);
      toast({
        title: "Extraction Failed",
        description: "Failed to parse PDF. Please try pasting text manually.",
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
      const message = error.message || "An unexpected error occurred. Please try again.";
      toast({
        title: "Processing Error",
        description: message,
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
          Upload your resume PDF or paste your experience manually to begin the intelligence audit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* PDF Upload Column */}
        <Card className="border border-slate-200 bg-white shadow-xl rounded-[2rem] overflow-hidden animate-reveal h-full flex flex-col">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold tracking-tight">PDF Upload</CardTitle>
                <CardDescription className="text-sm font-medium text-slate-500">
                  Automated structural extraction.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 flex-1 flex flex-col justify-center">
            <div 
              className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-12 bg-slate-50/30 hover:bg-slate-50/60 hover:border-primary/30 transition-all cursor-pointer group flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".pdf" 
                className="hidden" 
              />
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {isParsingPDF ? (
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                ) : (
                  <FileUp className="h-8 w-8 text-primary" />
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Select Resume PDF</h3>
              <p className="text-sm text-slate-500 text-center font-medium">Drop your file here or click to browse</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">Max 5MB • Standard PDF Format</p>
            </div>
          </CardContent>
        </Card>

        {/* Manual Text Column */}
        <Card className="border border-slate-200 bg-white shadow-xl rounded-[2rem] overflow-hidden animate-reveal h-full flex flex-col">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg text-white">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold tracking-tight">Manual Content</CardTitle>
                <CardDescription className="text-sm font-medium text-slate-500">
                  Precision manual entry.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 flex-1 flex flex-col gap-6">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between px-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Content Entry</label>
                {resumeText.length > 0 && (
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 animate-in fade-in">
                    <Sparkles className="h-3 w-3" />
                    Content Captured
                  </span>
                )}
              </div>
              <Textarea 
                placeholder="Paste your resume content, experience, and skills here..."
                className="flex-1 min-h-[200px] lg:min-h-[300px] resize-none border-slate-200 focus-visible:ring-primary text-sm p-6 bg-slate-50/10 rounded-2xl transition-all focus:bg-white"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || !resumeText.trim()}
            className="h-16 px-20 text-sm font-black uppercase tracking-widest rounded-full shadow-2xl shadow-primary/30 gap-3 transition-all hover:scale-[1.02] active:scale-95"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing Neural Scan...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Execute Intelligence Scan
              </>
            )}
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <AlertCircle className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Privacy Protected • Encrypted Intelligence Processing</span>
        </div>
      </div>
    </div>
  );
}
