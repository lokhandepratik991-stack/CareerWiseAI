"use client";

import { CheckCircle2, AlertCircle, Lightbulb, User, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AnalyzeResumeContentOutput } from '@/ai/flows/analyze-resume-content-flow';
import type { ResumeFeedbackReportOutput } from '@/ai/flows/generate-resume-feedback-report';

interface FeedbackSectionProps {
  analysis: AnalyzeResumeContentOutput;
  feedback: ResumeFeedbackReportOutput;
}

export function FeedbackSection({ analysis, feedback }: FeedbackSectionProps) {
  return (
    <div className="space-y-8 animate-reveal">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary and Skills */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Profile Narrative
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-slate-500 font-medium italic">
                "{analysis.overallSummary}"
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold tracking-tight">Competency Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Detailed Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
            <CardHeader className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-extrabold tracking-tighter">Executive Audit</CardTitle>
                  <CardDescription className="text-slate-500 font-medium mt-1">Algorithmic critique of your professional presentation.</CardDescription>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Verified Analysis
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-12 space-y-12">
              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Primary Strengths
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedback.strengths.map((s, i) => (
                    <div key={i} className="p-5 rounded-xl border border-slate-50 bg-slate-50/30">
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{s.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{s.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-slate-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Identified Gaps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedback.weaknesses.map((w, i) => (
                    <div key={i} className="p-5 rounded-xl border border-slate-50 bg-white shadow-sm">
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{w.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{w.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-slate-400 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  Strategic Suggestions
                </h3>
                <div className="space-y-4">
                  {feedback.suggestions.map((s, i) => (
                    <div key={i} className="p-6 rounded-xl border border-primary/10 bg-primary/[0.02] transition-colors hover:bg-primary/[0.04]">
                      <h4 className="font-bold text-sm text-primary mb-1 uppercase tracking-tight">{s.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{s.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}