
"use client";

import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Rocket className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-headline tracking-tight text-primary">
              CareerWise <span className="text-secondary">AI</span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/dashboard" className="transition-colors hover:text-primary">Analysis</Link>
          <Link href="/dashboard?tab=advice" className="transition-colors hover:text-primary">Advice</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button size="sm" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
