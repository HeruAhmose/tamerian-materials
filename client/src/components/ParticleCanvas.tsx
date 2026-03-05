import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  a: number;
  hu: number;
  baseA: number;
  pulse: number;
  pulseSpeed: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let particles: Particle[] = [];
    let animId: number;
    const hues = [174, 268, 43, 330];

    function resize() {
      w = c!.width = window.innerWidth;
      h = c!.height = window.innerHeight;
      makeParticles();
    }

    function makeParticles() {
      particles = [];
      const count = Math.min(100, Math.floor((w * h) / 12000));
      for (let i = 0; i < count; i++) {
        const baseA = Math.random() * 0.18 + 0.03;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          s: Math.random() * 1.8 + 0.3,
          a: baseA,
          baseA,
          hu: hues[i % 4],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.01 + 0.005,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse interaction — particles gently push away
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 200 && md > 0) {
          const force = (1 - md / 200) * 0.3;
          p.vx += (mdx / md) * force;
          p.vy += (mdy / md) * force;
          // Brighten near mouse
          p.a = p.baseA + (1 - md / 200) * 0.3;
        } else {
          p.a = p.baseA + Math.sin(p.pulse) * 0.04;
        }

        // Dampen velocity
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            const lineAlpha = (1 - d / 140) * 0.06;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `hsla(${p.hu},45%,58%,${lineAlpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }

        // Draw particle with glow
        const size = p.s + Math.sin(p.pulse) * 0.3;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hu},55%,65%,${p.a * 0.15})`;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hu},55%,65%,${p.a})`;
        ctx!.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
