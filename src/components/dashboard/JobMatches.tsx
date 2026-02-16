
"use client";

import { Briefcase, MapPin, Building2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AnalyzeResumeContentOutput } from '@/ai/flows/analyze-resume-content-flow';

interface JobMatchesProps {
  analysis: AnalyzeResumeContentOutput;
}

export function JobMatches({ analysis }: JobMatchesProps) {
  // Mock job matching based on first job title or top skill
  const baseTitle = analysis.experience[0]?.jobTitle || analysis.skills[0] || "Professional";
  
  const mockJobs = [
    {
      id: 1,
      title: `Senior ${baseTitle}`,
      company: "TechFlow Systems",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$120k - $160k",
      matchingSkills: analysis.skills.slice(0, 3)
    },
    {
      id: 2,
      title: `${baseTitle} Lead`,
      company: "Innovate Corp",
      location: "New York, NY",
      type: "Full-time",
      salary: "$140k - $185k",
      matchingSkills: analysis.skills.slice(1, 4)
    },
    {
      id: 3,
      title: `Staff ${baseTitle}`,
      company: "Stellar Global",
      location: "Austin, TX / Hybrid",
      type: "Full-time",
      salary: "$150k - $210k",
      matchingSkills: analysis.skills.slice(2, 5)
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold font-headline text-primary">Recommended for You</h2>
          <p className="text-sm text-muted-foreground">Based on your skills and professional experience.</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">3 Matches Found</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobs.map(job => (
          <Card key={job.id} className="flex flex-col h-full hover:shadow-lg transition-all border-primary/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary">{job.type}</Badge>
              </div>
              <CardTitle className="text-xl mt-4 leading-tight">{job.title}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <span className="font-medium text-primary">{job.company}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                  <Briefcase className="h-4 w-4" />
                  {job.salary}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Matching Skills</span>
                <div className="flex flex-wrap gap-1">
                  {job.matchingSkills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] bg-background">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full gap-2" variant="outline">
                View Details
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
