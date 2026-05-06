"use client";

import React from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import VantaBackground from "./components/VantaBackground";

import { products } from "./lib/constants";

export default function Home() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">

      {/* Hero wrapper — cloud gradient (light) / dark navy (dark) */}
      <div
        className="relative flex flex-col flex-1"
        style={{
          background: isDark
            ? 'transparent'  // dark bg-background from globals handles it
            : 'radial-gradient(ellipse 80% 60% at 50% 0%, #bfdbfe 0%, #e0e7ff 35%, #ffffff 70%)'
        }}
      >
        <VantaBackground />






        {/* ── Navbar ── */}
        <Navbar />


        {/* ── Hero ── */}
        <section className="relative z-20 text-center px-5 pt-10 sm:pt-16 pb-8 max-w-2xl mx-auto w-full">

          {/* Eyebrow */}



          {/* Headline — clamp so it stays 1-2 lines on any screen */}
          <h1 className="text-[clamp(1.9rem,5.5vw,3.4rem)] font-black leading-[1.08] tracking-[-1.5px] mb-4 text-foreground">
            Your Supply Chain<br className="hidden sm:block" />
            {" "}Thinks{" "}
            <span className="bg-linear-to-r from-primary to-cyan-500 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
              For Itself.
            </span>
          </h1>

          {/* Subtitle — shorter on mobile */}
          <p className="text-[13px] sm:text-[15px] text-muted-fg leading-relaxed max-w-[380px] mx-auto mb-8">
            Demand forecasting, sheet analysis, and full chain visibility — all AI-powered in one suite.
          </p>

          {/* Pill badges — wrap gracefully */}
          <div className="flex flex-wrap justify-center gap-2">
            {["Adaptive AI", "Minimal Setup", "Enterprise Ready", "Complete Auditibility"].map(t => (
              <span key={t} className="flex items-center gap-1 text-[10px] font-medium text-muted-fg bg-muted border border-border px-2.5 py-1 rounded-full">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5.5L4 7.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── Choose a Tool Divider ── */}
        <div className="relative z-20 flex items-center justify-center max-w-2xl mx-auto px-5 w-full mb-12">
          {/* Gradient Lines */}
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full h-[1px] bg-linear-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Label Badge */}
          <div className="relative flex items-center gap-3 px-6 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-md shadow-sm">
            {/* <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> */}
            <span className="text-[10px] font-black tracking-[3px] uppercase text-foreground/80">
              Choose a solution
            </span>
            {/* <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> */}
          </div>
        </div>

        {/* ── Cards — sits OUTSIDE the vanta hero wrapper, so animation doesn't bleed down ── */}
      </div>{/* End hero animated wrapper */}

      {/* Cards section — plain background */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 w-full pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} animClass={`anim-card-${i}`} />
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border w-full flex justify-center p-4 text-zinc-500 text-xs mt-auto">
        <span>© 2026 InvisibleCTO. All rights reserved</span>
      </footer>

    </div>
  );
}

/* ─── Product Card ─────────────────────────────────────────────────────── */
type Product = (typeof products)[number];

function ProductCard({ p, animClass }: { p: Product; animClass: string }) {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      className={`
        ${animClass}
        group relative flex flex-col no-underline
        rounded-[2rem] border border-border/50 bg-card/40 backdrop-blur-2xl
        px-6 pt-7 pb-6 overflow-hidden
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:-translate-y-2
        hover:shadow-[0_32px_64px_-16px_hsl(var(--primary)/0.15)]
        hover:border-primary/40
        hover:bg-card/60
      `}
      style={{
        // @ts-ignore
        "--mouse-x": `${coords.x}px`,
        // @ts-ignore
        "--mouse-y": `${coords.y}px`,
      }}
    >
      {/* ── Background Elements ── */}

      {/* Subtle Mesh Grid */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1.5px, transparent 0)`, backgroundSize: '24px 24px' }} />

      {/* Decorative Large Shape 1 (Top Left) */}
      <div className="absolute -top-16 -left-16 w-44 h-44 rounded-full bg-primary/15 blur-[50px] group-hover:bg-primary/25 transition-all duration-1000 group-hover:scale-150" />

      {/* Decorative Large Shape 2 (Bottom Right) */}
      <div className="absolute -bottom-20 -right-20 w-52 h-52 rounded-full bg-primary/15 blur-[60px] group-hover:bg-primary/30 transition-all duration-1000 group-hover:-translate-x-10 group-hover:-translate-y-10" />

      {/* Geometric SVG Accents */}
      <svg className="absolute top-6 right-6 w-14 h-14 text-primary opacity-30 group-hover:opacity-60 transition-all duration-700 group-hover:rotate-90" viewBox="0 0 100 100" fill="none">
        <path d="M10 0V10M10 0H0M90 0V10M90 0H100M10 90V100M10 100H0M90 90V100M90 100H100" stroke="currentColor" strokeWidth="3" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </svg>

      {/* Floating Particles (Static SVG) */}


      {/* Dynamic Glow Spotlight */}
      <div className="
        absolute -inset-px opacity-0 group-hover:opacity-100
        transition-opacity duration-700 pointer-events-none
        bg-[radial-gradient(300px_circle_at_var(--mouse-x)_var(--mouse-y),hsl(var(--primary)/0.15),transparent_80%)]
      " />

      {/* Animated Corner Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Header: Icon & Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className={`
            w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0
            transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg
            ${p.iconBg} ${p.iconBorder} ${p.iconColor}
            shadow-sm
          `}>
            {p.icon}
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mb-6">
          <h2 className="text-[1.25rem] font-black tracking-tight text-foreground leading-tight mb-2 group-hover:text-primary transition-colors duration-500">
            {p.name}
          </h2>
          <p className="text-[13px] text-muted-fg leading-relaxed font-medium">
            {p.tagline}
          </p>
        </div>

        {/* Features List (The "Pricing Card" feel) */}
        <div className="flex flex-col gap-2.5 mb-8">
          {p.features?.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2.5 group/feat">
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 border border-primary/20 transition-transform duration-300 group-hover/feat:scale-110">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-[12px] text-foreground/80 font-semibold tracking-tight transition-colors duration-300 group-hover/feat:text-foreground">
                {feat}
              </span>
            </div>
          ))}
        </div>

        {/* Divider & CTA */}
        <div className="mt-auto pt-5 border-t border-border/40">
          <div className={`flex items-center justify-between group/cta ${p.ctaCls}`}>
            <span className="text-[10px] font-black tracking-tight uppercase">
              {p.cta}
            </span>
            <div className="w-7 h-7 rounded-full border border-current flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}