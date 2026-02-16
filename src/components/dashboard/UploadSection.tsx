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
      // Dynamic import to avoid Node.js build issues
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

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
        title: "Intelligence Captured",
        description: "Resume text extracted successfully. Proceed to analysis.",
      });
    } catch (error: any) {
      console.error("PDF Parsing error:", error);
      toast({
        title: "Extraction Failed",
        description: "Could not parse this PDF. Please ensure it is not protected or try pasting the text manually.",
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
        title: "Intelligence Gap",
        description: "Please provide resume content via upload or text input.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const output = await performDeepAnalysis({ resumeText });
      
      if (!output) {
        throw new Error("Intelligence engine yielded no results.");
      }

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
      console.error("Deep analysis failed", error);
      toast({
        title: "Processing Error",
        description: error.message || "The intelligence engine encountered an issue. Please try again shortly.",
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
          Upload your professional history for deep algorithmic analysis and strategic pathing.
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
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <FileUp className="h-3.5 w-3.5" />
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
              placeholder="Paste your resume content here..."
              className="min-h-[450px] resize-none border-slate-200 focus-visible:ring-primary focus-visible:border-primary text-base p-8 bg-slate-50/30 rounded-2xl transition-all"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            {!resumeText.trim() && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-8">
                <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2rem] border border-dashed border-slate-300 flex flex-col items-center gap-6 pointer-events-auto shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <FileUp className="h-8 w-8" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xl font-bold text-slate-900">Choose your input method</p>
                    <p className="text-sm text-slate-500 font-medium">Upload a PDF for automatic extraction or start typing</p>
                  </div>
                  <div className="flex items-center gap-4 w-full px-4">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">OR</span>
                    <div className="h-px bg-slate-200 flex-1" />
                  </div>
                  <Button 
                    variant="ghost" 
                    className="gap-2 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full px-8"
                    onClick={() => document.querySelector('textarea')?.focus()}
                  >
                    <MousePointer2 className="h-3.5 w-3.5" />
                    Paste Manual Text
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-10">
            <Button 
              size="lg" 
              type="button"
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !resumeText.trim()}
              className="h-16 px-16 text-sm font-black uppercase tracking-[0.2em] rounded-full shadow-2xl shadow-primary/30 gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
          { icon: Zap, title: "Efficiency", desc: "Proprietary text extraction bypasses complex formatting hurdles." },
          { icon: BrainCircuit, title: "Precision", desc: "Multimodal mapping identifies core competencies and leadership signals." },
          { icon: Rocket, title: "Velocity", desc: "Accelerate your professional trajectory with high-impact revision." }
        ].map((item, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 transition-colors group-hover:bg-primary group-hover:text-white">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
