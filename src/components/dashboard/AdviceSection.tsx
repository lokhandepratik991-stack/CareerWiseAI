
"use client";

import { Lightbulb, BookOpen, UserCheck, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function AdviceSection() {
  const tips = [
    {
      id: "resume",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      title: "Resume Optimization",
      content: [
        "Use action verbs (e.g., 'Implemented', 'Strategized', 'Managed') to start bullet points.",
        "Quantify your achievements with metrics and percentages.",
        "Tailor your resume for every job application by including relevant keywords.",
        "Keep the design clean and easily readable for ATS systems."
      ]
    },
    {
      id: "interview",
      icon: <UserCheck className="h-5 w-5 text-primary" />,
      title: "Interview Mastery",
      content: [
        "Research the company thoroughly before the interview.",
        "Use the STAR method (Situation, Task, Action, Result) for behavioral questions.",
        "Prepare 3-5 thoughtful questions to ask the interviewer.",
        "Practice your 'elevator pitch' summarizing your value proposition."
      ]
    },
    {
      id: "development",
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      title: "Continuous Development",
      content: [
        "Identify skill gaps in your industry and take online certifications.",
        "Network actively on professional platforms like LinkedIn.",
        "Seek mentorship from leaders in your desired field.",
        "Build a personal portfolio or GitHub profile to showcase your work."
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-headline text-primary">Professional Growth Advice</h2>
          <p className="text-muted-foreground text-sm">Actionable tips to help you land your dream role.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Accordion type="single" collapsible className="w-full">
          {tips.map((tip, idx) => (
            <AccordionItem key={tip.id} value={tip.id} className="border bg-white rounded-lg px-6 mb-4 overflow-hidden shadow-sm">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  {tip.icon}
                  <span className="text-lg font-semibold">{tip.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <ul className="space-y-3">
                  {tip.content.map((item, i) => (
                    <li key={i} className="flex gap-2 text-muted-foreground leading-relaxed">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
