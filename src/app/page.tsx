import Link from 'next/link';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Rocket, ShieldCheck, Zap, ArrowRight, CheckCircle, Sparkles, Star, Globe, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] premium-gradient overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-48">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-8 animate-reveal">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Enterprise Career Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold font-headline leading-[0.9] tracking-tighter mb-8 animate-reveal [animation-delay:100ms]">
              <span className="text-slate-900">Precision Career</span>
              <br />
              <span className="text-primary">Optimization.</span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12 animate-reveal [animation-delay:200ms]">
              Harness the power of neural resume analysis to unlock elite professional opportunities. Designed for high-performers seeking absolute competitive advantage.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal [animation-delay:300ms]">
              <Button size="lg" className="h-14 px-10 text-base font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all" asChild>
                <Link href="/dashboard" className="gap-2">
                  Launch Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="h-14 px-10 text-base font-bold rounded-full hover:bg-slate-100 transition-all" asChild>
                <Link href="/dashboard?tab=advice">Corporate Solutions</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Abstract backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[160px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-[160px]" />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale transition-all hover:grayscale-0">
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">FAANG</div>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">GOLDMAN</div>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">MCKINSEY</div>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">STRIPE</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Neural Parsing</h3>
              <p className="text-slate-500 leading-relaxed">Advanced LLM-driven extraction technology that identifies multi-dimensional skill relationships within your professional history.</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Market Benchmarking</h3>
              <p className="text-slate-500 leading-relaxed">Real-time comparison against industry-leading talent pools to determine your exact market value and growth potential.</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">ATS Compliance</h3>
              <p className="text-slate-500 leading-relaxed">Ensure your documentation passes through proprietary applicant tracking systems with maximum score density.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-32 container mx-auto px-4">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-32 text-center relative overflow-hidden shadow-3xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">Redefine your trajectory.</h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">The difference between a career and a legacy is strategy. Start your neural analysis today.</p>
            <Button size="lg" className="h-16 px-16 text-lg font-bold rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-2xl transition-all" asChild>
              <Link href="/dashboard">Begin Elite Analysis</Link>
            </Button>
          </div>
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />
        </div>
      </section>

      <footer className="py-24 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-slate-900 p-1.5 rounded-lg">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tighter">CareerWise <span className="text-primary">AI</span></span>
              </Link>
              <p className="text-slate-400 text-sm max-w-xs">The world's most advanced professional intelligence platform for executive-level career development.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Product</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-500 font-medium">
                  <Link href="#" className="hover:text-primary">Neural Scan</Link>
                  <Link href="#" className="hover:text-primary">Benchmarking</Link>
                  <Link href="#" className="hover:text-primary">Roadmaps</Link>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Company</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-500 font-medium">
                  <Link href="#" className="hover:text-primary">About</Link>
                  <Link href="#" className="hover:text-primary">Privacy</Link>
                  <Link href="#" className="hover:text-primary">Terms</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-slate-50 text-center text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
            © 2024 CAREERWISE INTELLIGENCE GROUP.
          </div>
        </div>
      </footer>
    </div>
  );
}