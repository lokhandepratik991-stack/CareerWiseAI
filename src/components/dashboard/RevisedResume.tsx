"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, FileCheck, Info } from 'lucide-react';

interface RevisedResumeProps {
  markdown: string;
}

export function RevisedResume({ markdown }: RevisedResumeProps) {
  return (
    <div className="space-y-8 animate-reveal">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Helper Sidebar */}
        <div className="lg:col-span-1 space-y-6 print:hidden">
          <Card className="border-slate-100 shadow-sm bg-slate-50/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Optimization Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-500 space-y-4 font-medium">
              <p>This version has been rebuilt using industry-standard ATS (Applicant Tracking System) criteria.</p>
              <ul className="space-y-2 list-disc pl-4">
                <li>Keyword density optimized for recruiters</li>
                <li>Action-oriented bullet points</li>
                <li>Quantified achievement metrics</li>
                <li>Standard header hierarchy</li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="p-6 rounded-2xl border border-primary/10 bg-primary/5 space-y-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h4 className="text-sm font-bold">Ready for Export</h4>
            <p className="text-[11px] text-slate-600 font-medium">Click "Export PDF" in the dashboard header to save this professionally formatted version.</p>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="lg:col-span-3">
          <Card className="border-slate-200 shadow-2xl bg-white relative overflow-hidden print-area">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary print:hidden" />
            <CardHeader className="p-12 pb-6 print:p-8">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
                    <FileCheck className="h-6 w-6 text-primary print:hidden" />
                    Revised Master Resume
                  </CardTitle>
                  <CardDescription className="text-slate-500 font-medium mt-1 print:hidden">
                    Validated structural optimization for enterprise selection.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-12 pt-0 font-body text-slate-800 print:p-8 print:pt-0">
              <div className="max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-sm print:text-xs">
                  {markdown || "Resume generation in progress..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
