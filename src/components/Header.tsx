"use client";

import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 p-1.5 rounded-lg transition-transform group-hover:scale-105">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900">
              CareerWise <span className="text-primary">AI</span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">
          <Link href="/" className="transition-colors hover:text-primary">Overview</Link>
          <Link href="/dashboard" className="transition-colors hover:text-primary">Analysis</Link>
          <Link href="/dashboard?tab=advice" className="transition-colors hover:text-primary">Intelligence</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-full border-slate-200 text-[11px] font-black uppercase tracking-widest px-6" asChild>
            <Link href="/dashboard">Access Portal</Link>
          </Button>
          <Button size="sm" className="rounded-full px-6 text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}