
"use client";

import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Rocket className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black font-headline tracking-tighter text-primary group-hover:text-purple-600 transition-colors">
              CareerWise <span className="text-secondary">AI</span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-10 text-sm font-bold tracking-widest uppercase">
          <Link href="/" className="transition-colors hover:text-primary relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-primary relative group">
            Analysis
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="/dashboard?tab=advice" className="transition-colors hover:text-primary relative group">
            Advice
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button size="lg" className="rounded-full px-8 font-bold tracking-tight shadow-xl shadow-primary/20" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
