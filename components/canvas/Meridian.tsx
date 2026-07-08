"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type MeridianProps = {
  className?: string;
  /** base rotation speed multiplier */
  speed?: number;
  /** 0–1 how much accent activity (signals/pulses) */
  activity?: number;
  /** mouse-driven rotation */
  interactive?: boolean;
  /** radius as fraction of min(canvas w,h) */
  radiusScale?: number;
};

const PAPER = "239, 237, 231";
const ACCENT = "194, 168, 120";

/**
 * The NIZAM Meridian — a wireframe sphere of ordered nodes.
 * Signals travel its meridians; nodes pulse as operations resolve.
 * Pure 2D-canvas 3D projection: no WebGL, ~60fps.
 */
export default function Meridian({
  className,
  speed = 1,
  activity = 1,
  interactive = true,
  radiusScale = 0.36,
}: MeridianProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activityRef = useRef(activity);

  useEffect(() => {
    activityRef.current = activity;
  }, [activity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const RINGS = 12;
    const SEGS = 28;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let rotY = Math.PI * 0.25;
    let curRX = 0;
    let curRY = 0;
    let targetRX = 0;
    let targetRY = 0;
    let last = performance.now();

    type Signal = { seg: number; t: number; v: number; dir: 1 | -1 };
    const signals: Signal[] = Array.from({ length: 4 }, () => ({
      seg: Math.floor(Math.random() * SEGS),
      t: Math.random(),
      v: 0.1 + Math.random() * 0.15,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    type Pulse = { ring: number; seg: number; life: number };
    let pulses: Pulse[] = [];
    let pulseClock = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      targetRY = ((e.clientX - (r.left + r.width / 2)) / r.width) * 0.8;
      targetRX = ((e.clientY - (r.top + r.height / 2)) / r.height) * 0.55;
    };

    const surface = (i: number, j: number) => {
      const phi = (i / RINGS) * Math.PI;
      const theta = (j / SEGS) * Math.PI * 2;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    };

    const rotate = (p: { x: number; y: number; z: number }, ry: number, rx: number) => {
      const x1 = p.x * Math.cos(ry) + p.z * Math.sin(ry);
      const z1 = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
      const y1 = p.y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 = p.y * Math.sin(rx) + z1 * Math.cos(rx);
      return { x: x1, y: y1, z: z2 };
    };

    const project = (p: { x: number; y: number; z: number }, R: number) => {
      const fov = 3.4;
      const s = fov / (fov + p.z);
      return { x: w / 2 + p.x * R * s, y: h / 2 + p.y * R * s, s, z: p.z };
    };

    const depthAlpha = (z: number, near = 0.32, far = 0.04) =>
      far + ((1 - (z + 1) / 2) * (near - far));

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * radiusScale;
      const ry = rotY + curRY;
      const rx = 0.32 + curRX;
      const act = activityRef.current;

      const pt = (i: number, j: number) => project(rotate(surface(i, j), ry, rx), R);

      ctx.lineWidth = 1;

      // latitude rings
      for (let i = 1; i < RINGS; i++) {
        for (let j = 0; j < SEGS; j++) {
          const a = pt(i, j);
          const b = pt(i, (j + 1) % SEGS);
          ctx.strokeStyle = `rgba(${PAPER}, ${depthAlpha((a.z + b.z) / 2)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // meridians (every other for lightness)
      for (let j = 0; j < SEGS; j += 2) {
        for (let i = 0; i < RINGS; i++) {
          const a = pt(i, j);
          const b = pt(i + 1, j);
          ctx.strokeStyle = `rgba(${PAPER}, ${depthAlpha((a.z + b.z) / 2, 0.22, 0.03)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes
      for (let i = 1; i < RINGS; i++) {
        for (let j = 0; j < SEGS; j += 2) {
          const p = pt(i, j);
          ctx.fillStyle = `rgba(${PAPER}, ${depthAlpha(p.z, 0.5, 0.06)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.1 * p.s, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // traveling signals along meridians
      for (const s of signals) {
        s.t += s.v * dt * act;
        if (s.t > 1) {
          s.t = 0;
          s.seg = Math.floor(Math.random() * SEGS);
          s.v = 0.1 + Math.random() * 0.15;
        }
        const fi = s.dir === 1 ? s.t * RINGS : (1 - s.t) * RINGS;
        const p = pt(fi, s.seg);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14 * p.s);
        glow.addColorStop(0, `rgba(${ACCENT}, ${0.55 * p.s * act})`);
        glow.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 14 * p.s, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${ACCENT}, ${Math.min(1, 0.9 * p.s) * act})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8 * p.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // node pulses
      pulseClock += dt;
      if (pulseClock > 1.4 / Math.max(act, 0.2)) {
        pulseClock = 0;
        pulses.push({
          ring: 1 + Math.floor(Math.random() * (RINGS - 1)),
          seg: Math.floor(Math.random() * SEGS),
          life: 1,
        });
      }
      pulses = pulses.filter((pu) => pu.life > 0);
      for (const pu of pulses) {
        pu.life -= dt * 0.8;
        const p = pt(pu.ring, pu.seg);
        const r = (1 - pu.life) * 22 * p.s + 2;
        ctx.strokeStyle = `rgba(${ACCENT}, ${Math.max(0, pu.life * 0.5) * p.s})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) {
        rotY += dt * 0.11 * speed;
        curRX += (targetRX - curRX) * 0.045;
        curRY += (targetRY - curRY) * 0.045;
        draw(dt);
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(canvas);

    if (interactive && !reduced) window.addEventListener("mousemove", onMouse, { passive: true });

    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, [speed, interactive, radiusScale]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
