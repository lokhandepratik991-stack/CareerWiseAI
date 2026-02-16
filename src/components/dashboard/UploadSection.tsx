
"use client";

import { useState, useRef } from 'react';
import { FileText, Loader2, Sparkles, BrainCircuit, Rocket, Zap, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { performDeepAnalysis, type DeepAnalysisOutput } from '@/ai/flows/deep-analysis-flow';
import type { AnalyzeResumeContentOutput } from '@/ai/flows/analyze-resume-content-flow';
import type { ResumeFeedbackReportOutput } from '@/ai/flows/generate-resume-feedback-report';
import type { GenerateCareerRecommendationsOutput } from '@/ai/flows/generate-career-recommendations';

// PDF parsing imports
import * as pdfjs from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      }

      setResumeText(fullText.trim());
      toast({
        title: "PDF Parsed",
        description: "Successfully extracted text from your resume.",
      });
    } catch (error) {
      console.error("PDF Parsing error:", error);
      toast({
        title: "Parsing failed",
        description: "Could not extract text from this PDF. Please try pasting the text manually.",
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
        title: "Input required",
        description: "Please paste your resume content or upload a PDF before initiating analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const output = await performDeepAnalysis({ resumeText });
      
      if (!output) {
        throw new Error("No output received from analysis engine.");
      }

      if (onDeepResults) {
        onDeepResults(output);
      } else {
        onResults(output.analysis, output.feedback, output.career);
      }

      toast({
        title: "Intelligence scan complete",
        description: "Your professional insights have been successfully generated.",
      });
    } catch (error: any) {
      console.error("Deep analysis failed", error);
      toast({
        title: "Analysis failure",
        description: error.message || "An error occurred during neural processing. Please verify your connection and try again.",
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
          Upload your PDF or paste your professional history for deep algorithmic analysis.
        </p>
      </div>

      <Card className="border border-slate-200 bg-white shadow-2xl rounded-[2rem] overflow-hidden animate-reveal [animation-delay:100ms]">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
            <div className="flex items-center gap-2">
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
                className="rounded-full gap-2 text-xs font-bold uppercase tracking-widest border-slate-200 shadow-sm"
              >
                {isParsingPDF ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Parsing PDF...
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" />
                    Upload PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative group">
            <Textarea 
              placeholder="Paste the full text of your resume or CV here, or upload a PDF using the button above..."
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
              type="button"
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
