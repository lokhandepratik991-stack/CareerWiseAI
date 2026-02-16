
"use client";

import { TrendingUp, Briefcase, ChevronRight, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { GenerateCareerRecommendationsOutput } from '@/ai/flows/generate-career-recommendations';

interface CareerSectionProps {
  career: GenerateCareerRecommendationsOutput;
}

export function CareerSection({ career }: CareerSectionProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Career Paths */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold font-headline text-primary">Recommended Career Paths</h2>
          </div>
          {career.careerPaths.map((path, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{path.name}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Target className="h-3 w-3" /> Growth Opportunities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {path.growthOpportunities.map((opp, j) => (
                      <Badge key={j} variant="outline" className="text-xs">
                        {opp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Job Roles */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold font-headline text-primary">Specific Job Roles</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {career.jobRoleRecommendations.map((job, i) => (
              <Card key={i} className="group overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{job.title}</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="line-clamp-2">{job.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block mb-2">Relevant Skills from Resume</span>
                    <div className="flex flex-wrap gap-1">
                      {job.relevantSkills.map((skill, j) => (
                        <Badge key={j} variant="secondary" className="text-[10px] py-0">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block mb-2">Search Keywords</span>
                    <div className="flex flex-wrap gap-1">
                      {job.keywords.map((kw, j) => (
                        <span key={j} className="text-[10px] text-primary/80 font-mono">#{kw.replace(/\s+/g, '')} </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
