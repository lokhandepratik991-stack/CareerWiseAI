
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Rocket, ShieldCheck, Zap, ArrowRight, CheckCircle, Sparkles, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 animate-in fade-in slide-in-from-top-8 duration-700">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Next-Generation Career Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black font-headline leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">Elevate Your</span>
              <br />
              <span className="text-foreground">Professional Path</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in zoom-in-95 duration-1000 delay-300">
              Stop guessing. CareerWise AI provides the scientific data you need to optimize your resume and navigate your career with absolute confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              <Button size="lg" className="h-16 px-12 text-xl rounded-full shadow-2xl shadow-primary/40 hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 border-none" asChild>
                <Link href="/dashboard" className="gap-3">
                  Start Analysis
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 text-xl rounded-full bg-white/40 backdrop-blur-xl border-primary/20 hover:bg-primary/5 transition-all duration-300" asChild>
                <Link href="/dashboard?tab=advice">View Expert Advice</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10 animate-float" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground tracking-tight">Powerful Intelligence Tools</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our proprietary AI engines are built by industry veterans to give you the ultimate edge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-white border shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="h-24 w-24 text-primary" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-8">
                <Zap className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Neural Analysis</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">Deep scanning of your professional DNA to identify hidden strengths and marketability.</p>
              <ul className="space-y-4">
                {["LSI Keyword Mapping", "Skill Gap Identification", "ATS Compliance Score"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden border-primary/20">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Star className="h-24 w-24 text-primary" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-8">
                <ShieldCheck className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Elite Feedback</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">Actionable critiques that mirror feedback from top-tier Fortune 500 recruiters.</p>
              <ul className="space-y-4">
                {["Executive Summary", "Impact Optimization", "Readability Metrics"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Rocket className="h-24 w-24 text-primary" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-8">
                <Rocket className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Growth Roadmap</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">A personalized strategic plan designed to accelerate your climb to the next level.</p>
              <ul className="space-y-4">
                {["Target Role Pathing", "Salary Benchmarking", "Search Keywords"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="bg-gradient-to-br from-primary via-purple-600 to-indigo-800 rounded-[3rem] p-12 md:p-24 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none">Your Future Starts Now</h2>
            <p className="text-xl text-primary-foreground/90 font-medium">Join 50,000+ high-performers who use CareerWise AI to dominate their career moves.</p>
            <Button size="lg" variant="secondary" className="h-16 px-12 text-xl rounded-full hover:scale-105 transition-all shadow-xl bg-white text-primary border-none" asChild>
              <Link href="/dashboard">Analyze My Resume</Link>
            </Button>
          </div>
          {/* Animated background blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl animate-float" />
        </div>
      </section>

      <footer className="py-16 border-t bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-xl">
                  <Rocket className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="text-2xl font-black font-headline tracking-tighter text-primary">CareerWise <span className="text-secondary">AI</span></span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">Building the future of professional development through advanced neural intelligence.</p>
            </div>
            <div className="flex gap-12 text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t text-center text-xs text-muted-foreground/60 font-medium tracking-wider">
            © 2024 CAREERWISE AI. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
