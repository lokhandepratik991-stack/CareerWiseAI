
"use client";

import { CheckCircle2, AlertCircle, Lightbulb, User } from 'lucide-react';
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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary and Skills */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {analysis.overallSummary}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Extracted Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Detailed Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/20 border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-2xl">Executive Feedback</CardTitle>
              <CardDescription>Comprehensive analysis of your professional profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Key Strengths
                </h3>
                <div className="space-y-4">
                  {feedback.strengths.map((s, i) => (
                    <div key={i} className="pl-4 border-l-2 border-green-200">
                      <h4 className="font-medium text-sm">{s.title}</h4>
                      <p className="text-sm text-muted-foreground">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Areas for Improvement
                </h3>
                <div className="space-y-4">
                  {feedback.weaknesses.map((w, i) => (
                    <div key={i} className="pl-4 border-l-2 border-amber-200">
                      <h4 className="font-medium text-sm">{w.title}</h4>
                      <p className="text-sm text-muted-foreground">{w.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Actionable Suggestions
                </h3>
                <div className="space-y-4">
                  {feedback.suggestions.map((s, i) => (
                    <div key={i} className="pl-4 border-l-2 border-primary/20 bg-primary/5 p-3 rounded-r-lg">
                      <h4 className="font-medium text-sm text-primary">{s.title}</h4>
                      <p className="text-sm text-muted-foreground">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
