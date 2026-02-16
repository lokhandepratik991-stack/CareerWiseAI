
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadSection } from '@/components/dashboard/UploadSection';
import { FeedbackSection } from '@/components/dashboard/FeedbackSection';
import { CareerSection } from '@/components/dashboard/CareerSection';
import { AdviceSection } from '@/components/dashboard/AdviceSection';
import { JobMatches } from '@/components/dashboard/JobMatches';
import { Button } from '@/components/ui/button';
import { FileText, TrendingUp, Lightbulb, Briefcase, ChevronLeft } from 'lucide-react';
import type { AnalyzeResumeContentOutput } from '@/ai/flows/analyze-resume-content-flow';
import type { ResumeFeedbackReportOutput } from '@/ai/flows/generate-resume-feedback-report';
import type { GenerateCareerRecommendationsOutput } from '@/ai/flows/generate-career-recommendations';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'upload';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [results, setResults] = useState<{
    analysis: AnalyzeResumeContentOutput;
    feedback: ResumeFeedbackReportOutput;
    career: GenerateCareerRecommendationsOutput;
  } | null>(null);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const handleResults = (
    analysis: AnalyzeResumeContentOutput,
    feedback: ResumeFeedbackReportOutput,
    career: GenerateCareerRecommendationsOutput
  ) => {
    setResults({ analysis, feedback, career });
    setActiveTab('report');
  };

  const resetAnalysis = () => {
    setResults(null);
    setActiveTab('upload');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {!results ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white border p-1 rounded-xl shadow-sm">
                <TabsTrigger value="upload" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Analysis</TabsTrigger>
                <TabsTrigger value="advice" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Tips & Advice</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upload">
              <UploadSection onResults={handleResults} />
            </TabsContent>
            
            <TabsContent value="advice">
              <AdviceSection />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Button variant="ghost" onClick={resetAnalysis} className="pl-0 gap-1 text-muted-foreground hover:text-primary">
                  <ChevronLeft className="h-4 w-4" />
                  New Analysis
                </Button>
                <h1 className="text-3xl font-bold font-headline text-primary mt-2">Career Insight Dashboard</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => window.print()}>Export PDF</Button>
                <Button size="sm">Share Report</Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent space-x-8 mb-8">
                <TabsTrigger 
                  value="report" 
                  className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 py-4 text-base bg-transparent shadow-none"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Feedback Report
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="career" 
                  className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 py-4 text-base bg-transparent shadow-none"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Career Guidance
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="jobs" 
                  className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 py-4 text-base bg-transparent shadow-none"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Job Matches
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="advice" 
                  className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 py-4 text-base bg-transparent shadow-none"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Expert Advice
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="report" className="mt-0">
                <FeedbackSection analysis={results.analysis} feedback={results.feedback} />
              </TabsContent>
              
              <TabsContent value="career" className="mt-0">
                <CareerSection career={results.career} />
              </TabsContent>
              
              <TabsContent value="jobs" className="mt-0">
                <JobMatches analysis={results.analysis} />
              </TabsContent>
              
              <TabsContent value="advice" className="mt-0">
                <AdviceSection />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}
