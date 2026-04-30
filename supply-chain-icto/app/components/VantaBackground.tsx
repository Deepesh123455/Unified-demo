'use client';

import React, { useEffect, useRef, useState } from "react";

interface Node {
  x: number; y: number;
  baseX: number; baseY: number;
  phase: number; speed: number;
  r: number;
}

interface Pulse {
  from: number; to: number;
  progress: number; speed: number;
}

export default function VantaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodes = useRef<Node[]>([]);
  const edges = useRef<[number, number][]>([]);
  const pulses = useRef<Pulse[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ── Theme detection ─────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    setMounted(true);
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // ── Canvas animation ─────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const edge = isDark ? '180,210,255' : '59,130,246';   // blue-500 (stronger for visibility)
    const pulse1 = isDark ? '125,211,252' : '96,165,250';   // sky-300 / blue-400
    const pulse2 = isDark ? '56,189,248' : '147,197,253';
    const core = isDark ? '14,165,233' : '59,130,246';   // sky-500 / blue-500
    const glow = isDark ? '56,189,248' : '96,165,250';   // sky-400 / blue-400
    const edgeAlpha = isDark ? 0.40 : 0.35;  // boosted for clear visibility
    const nodeAlpha = isDark ? 1.00 : 0.75;  // clearer nodes

    const build = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;

      const COLS = 14;
      const ROWS = 8;
      const gapX = W / (COLS - 1);
      const gapY = H / (ROWS - 1);
      const MAX_DIST = Math.hypot(gapX, gapY) * 1.45;

      nodes.current = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const offset = r % 2 === 0 ? 0 : gapX / 2;
          nodes.current.push({
            x: c * gapX + offset,
            y: r * gapY,
            baseX: c * gapX + offset,
            baseY: r * gapY,
            phase: Math.random() * Math.PI * 2,
            speed: 0.012 + Math.random() * 0.008,
            r: 1.8 + Math.random() * 1.2,
          });
        }
      }

      edges.current = [];
      for (let i = 0; i < nodes.current.length; i++) {
        for (let j = i + 1; j < nodes.current.length; j++) {
          const dx = nodes.current[i].baseX - nodes.current[j].baseX;
          const dy = nodes.current[i].baseY - nodes.current[j].baseY;
          if (Math.hypot(dx, dy) < MAX_DIST) {
            edges.current.push([i, j]);
          }
        }
      }

      return { W, H, MAX_DIST };
    };

    let { W, H, MAX_DIST } = build();

    const spawnTimer = setInterval(() => {
      if (edges.current.length === 0) return;
      const [from, to] = edges.current[Math.floor(Math.random() * edges.current.length)];
      pulses.current.push({ from, to, progress: 0, speed: 0.006 + Math.random() * 0.006 });
    }, 600);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const N = nodes.current;

      N.forEach(n => {
        n.phase += n.speed;
        n.x = n.baseX + Math.sin(n.phase) * 4;
        n.y = n.baseY + Math.cos(n.phase * 0.71) * 3;
      });

      // Edges
      edges.current.forEach(([i, j]) => {
        const dist = Math.hypot(N[i].x - N[j].x, N[i].y - N[j].y);
        if (dist >= MAX_DIST * 1.2) return;
        const a = (1 - dist / (MAX_DIST * 1.2)) * edgeAlpha;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${edge},${a})`;
        ctx.lineWidth = isDark ? 0.6 : 0.7;
        ctx.moveTo(N[i].x, N[i].y);
        ctx.lineTo(N[j].x, N[j].y);
        ctx.stroke();
      });

      // Energy pulses
      pulses.current = pulses.current.filter(p => {
        p.progress += p.speed;
        if (p.progress >= 1) return false;
        const a = N[p.from], b = N[p.to];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 9);
        g.addColorStop(0, `rgba(${pulse1},0.95)`);
        g.addColorStop(0.4, `rgba(${pulse2},0.4)`);
        g.addColorStop(1, `rgba(${pulse1},0)`);
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // Nodes
      N.forEach(n => {
        const mDist = Math.hypot(mouse.current.x - n.x, mouse.current.y - n.y);
        const hover = Math.max(0, 1 - mDist / 100);
        const pulse = 0.5 + 0.5 * Math.sin(n.phase);

        const glowR = n.r * (3 + hover * 4);
        const glowAlpha = (isDark ? 0.12 : 0.06) + hover * 0.35 + pulse * 0.05;
        const g2 = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        g2.addColorStop(0, `rgba(${glow},${glowAlpha.toFixed(2)})`);
        g2.addColorStop(1, `rgba(${glow},0)`);
        ctx.beginPath();
        ctx.fillStyle = g2;
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        const coreA = ((isDark ? 0.45 : 0.30) + pulse * 0.20 * nodeAlpha + hover * 0.3).toFixed(2);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${core},${coreA})`;
        ctx.arc(n.x, n.y, n.r * (1 + hover * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMove);

    const onResize = () => { ({ W, H, MAX_DIST } = build()); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(spawnTimer);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [isDark, mounted]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        opacity: isDark ? 0.80 : 0.85,  // increased for better visibility of threads
        // Multi-directional fade: bottom AND sides dissolve softly
        WebkitMaskImage: isDark
          ? 'linear-gradient(to bottom, black 55%, transparent 100%)'
          : 'radial-gradient(ellipse 90% 80% at 50% 30%, black 30%, transparent 75%)',
        maskImage: isDark
          ? 'linear-gradient(to bottom, black 55%, transparent 100%)'
          : 'radial-gradient(ellipse 90% 80% at 50% 30%, black 30%, transparent 75%)',
        pointerEvents: "none",
      }}
    />
  );
}