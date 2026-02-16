"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadSection } from '@/components/dashboard/UploadSection';
import { FeedbackSection } from '@/components/dashboard/FeedbackSection';
import { CareerSection } from '@/components/dashboard/CareerSection';
import { AdviceSection } from '@/components/dashboard/AdviceSection';
import { JobMatches } from '@/components/dashboard/JobMatches';
import { RevisedResume } from '@/components/dashboard/RevisedResume';
import { Button } from '@/components/ui/button';
import { FileText, TrendingUp, Lightbulb, Briefcase, ChevronLeft, Download, FileCheck } from 'lucide-react';
import type { DeepAnalysisOutput } from '@/ai/flows/deep-analysis-flow';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'upload';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [results, setResults] = useState<DeepAnalysisOutput | null>(null);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const handleResults = (
    analysis: DeepAnalysisOutput['analysis'],
    feedback: DeepAnalysisOutput['feedback'],
    career: DeepAnalysisOutput['career'],
    revisedResumeMarkdown?: string
  ) => {
    // Note: The signature of onResults in UploadSection needs to match
    setResults({ 
      analysis, 
      feedback, 
      career, 
      revisedResumeMarkdown: revisedResumeMarkdown || '' 
    });
    setActiveTab('report');
  };

  const handleDeepResults = (output: DeepAnalysisOutput) => {
    setResults(output);
    setActiveTab('report');
  };

  const resetAnalysis = () => {
    setResults(null);
    setActiveTab('upload');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col pt-20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {!results ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white border border-slate-200 p-1 rounded-full shadow-sm">
                <TabsTrigger value="upload" className="rounded-full px-8 text-xs font-black uppercase tracking-widest data-[state=active]:bg-slate-900 data-[state=active]:text-white">Analysis</TabsTrigger>
                <TabsTrigger value="advice" className="rounded-full px-8 text-xs font-black uppercase tracking-widest data-[state=active]:bg-slate-900 data-[state=active]:text-white">Knowledge Base</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upload">
              <UploadSection onResults={(a, f, c) => handleResults(a, f, c)} onDeepResults={handleDeepResults} />
            </TabsContent>
            
            <TabsContent value="advice">
              <AdviceSection />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-12 animate-reveal">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
              <div className="space-y-2">
                <Button variant="ghost" onClick={resetAnalysis} className="pl-0 gap-1 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">
                  <ChevronLeft className="h-3 w-3" />
                  Initialize New Scan
                </Button>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-900">Career Intelligence Dashboard</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => window.print()} className="rounded-full gap-2 px-6 text-xs font-bold border-slate-200 shadow-sm">
                  <Download className="h-3.5 w-3.5" />
                  Export PDF
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b border-slate-100 rounded-none h-auto p-0 bg-transparent space-x-10 mb-10 overflow-x-auto no-scrollbar print:hidden">
                {[
                  { id: 'report', icon: FileText, label: 'Audit Report' },
                  { id: 'revised', icon: FileCheck, label: 'Optimized Resume' },
                  { id: 'career', icon: TrendingUp, label: 'Strategic Pathing' },
                  { id: 'jobs', icon: Briefcase, label: 'Market Matches' },
                  { id: 'advice', icon: Lightbulb, label: 'Expert Guidance' }
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id} 
                    className="data-[state=active]:border-primary data-[state=active]:text-slate-900 border-b-2 border-transparent rounded-none px-0 py-6 text-[11px] font-black uppercase tracking-[0.15em] bg-transparent shadow-none transition-all hover:text-slate-600"
                  >
                    <div className="flex items-center gap-2">
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="report" className="mt-0 focus-visible:ring-0">
                <FeedbackSection analysis={results.analysis} feedback={results.feedback} />
              </TabsContent>
              
              <TabsContent value="revised" className="mt-0 focus-visible:ring-0">
                <RevisedResume markdown={results.revisedResumeMarkdown} />
              </TabsContent>
              
              <TabsContent value="career" className="mt-0 focus-visible:ring-0">
                <CareerSection career={results.career} />
              </TabsContent>
              
              <TabsContent value="jobs" className="mt-0 focus-visible:ring-0">
                <JobMatches analysis={results.analysis} />
              </TabsContent>
              
              <TabsContent value="advice" className="mt-0 focus-visible:ring-0">
                <AdviceSection />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold tracking-tighter uppercase text-slate-400">Loading Intelligence...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
