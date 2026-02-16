
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Rocket, ShieldCheck, Zap, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <Rocket className="h-4 w-4" />
              <span>Transform Your Career with AI</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary leading-tight tracking-tight">
              Personalized Career <span className="text-secondary">Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              CareerWise AI analyzes your resume to provide deep insights, actionable feedback, and a tailored roadmap to your next big professional milestone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/20" asChild>
                <Link href="/dashboard" className="gap-2">
                  Get Free Analysis
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full bg-white/50 backdrop-blur" asChild>
                <Link href="/dashboard?tab=advice">Explore Advice</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Everything you need to advance</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Powerful AI-driven tools designed to give you a competitive edge in today's job market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Zap className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold font-headline">Instant Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">Our AI parses your experience, skills, and education in seconds to identify what makes you stand out.</p>
              <ul className="space-y-3 pt-2">
                {["Keyword extraction", "Skill mapping", "Experience scoring"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ShieldCheck className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold font-headline">Actionable Feedback</h3>
              <p className="text-muted-foreground leading-relaxed">Receive a comprehensive report detailing strengths, weaknesses, and concrete areas for improvement.</p>
              <ul className="space-y-3 pt-2">
                {["Resume readability", "Quantified achievements", "Bullet point impact"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Rocket className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold font-headline">Career Roadmap</h3>
              <p className="text-muted-foreground leading-relaxed">Discover personalized career paths and specific job roles that match your unique background and potential.</p>
              <ul className="space-y-3 pt-2">
                {["Job role suggestions", "Skill gap analysis", "Growth opportunities"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-primary-foreground relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Ready to take the next step?</h2>
              <p className="text-xl text-primary-foreground/80">Join thousands of professionals who have accelerated their careers with CareerWise AI.</p>
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full" asChild>
                <Link href="/dashboard">Get Your Report Now</Link>
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>

      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-headline text-primary">CareerWise <span className="text-secondary">AI</span></span>
          </div>
          <p className="text-muted-foreground text-sm">© 2024 CareerWise AI. Empowering professional journeys.</p>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
