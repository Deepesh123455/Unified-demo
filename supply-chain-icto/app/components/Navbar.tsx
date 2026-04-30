'use client';

import React, { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? // Scrolled: frosted glass with subtle border
          'border-b border-border/60 bg-white/70 dark:bg-background/80 backdrop-blur-2xl shadow-sm'
          : // At top: fully transparent — merges with cloud bg
          'border-b border-transparent bg-transparent backdrop-blur-none'
        }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md flex items-center justify-center bg-primary shrink-0">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-bold text-[15px] tracking-tight text-foreground">InvisibleCTO</span>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
