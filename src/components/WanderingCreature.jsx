import React, { useEffect, useRef } from 'react';
import './WanderingCreature.css';

/*
 * A tiny jellyfish-like creature that wanders the page using canvas 2D.
 * It follows a smooth sine-wave path and wiggles its tentacles.
 * Completely non-invasive — fixed overlay, pointer-events: none.
 */
export default function WanderingCreature() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let W = window.innerWidth;
        let H = document.documentElement.scrollHeight;

        const resize = () => {
            W = window.innerWidth;
            H = Math.max(document.documentElement.scrollHeight, window.innerHeight);
            canvas.width = W;
            canvas.height = H;
        };
        resize();
        window.addEventListener('resize', resize);

        // Creature state
        let t = 0;
        let x = W * 0.15;
        let y = H * 0.25;

        // Path: wanders using layered sine waves
        const speed = 0.5;
        let rafId;

        const NUM_TENTACLES = 6;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Move along a complex lissajous-ish path
            x += Math.cos(t * 0.45) * speed * 1.4 + Math.cos(t * 0.8) * 0.5;
            y += Math.sin(t * 0.3) * speed + Math.sin(t * 0.65) * 0.6;

            // Wrap around viewport edges
            if (x < 40) x = 40;
            if (x > W - 40) x = W - 40;
            if (y < 80) y = 80;
            if (y > H - 80) y = H - 80;

            const scrollY = window.scrollY;
            // Only draw when creature is in visible viewport
            if (y - scrollY < -80 || y - scrollY > window.innerHeight + 80) {
                t += 0.022;
                rafId = requestAnimationFrame(draw);
                return;
            }

            const drawY = y - scrollY; // canvas is fixed so subtract scroll

            ctx.save();

            // ── Bell (body) ──────────────────────────────────────────────
            const r = 22;
            const pulse = 1 + Math.sin(t * 3) * 0.04;

            const grad = ctx.createRadialGradient(x, drawY - 4, 2, x, drawY, r * pulse);
            grad.addColorStop(0, 'rgba(200, 246, 93, 0.85)');
            grad.addColorStop(0.6, 'rgba(92, 122, 31, 0.55)');
            grad.addColorStop(1, 'rgba(92, 122, 31, 0)');

            ctx.beginPath();
            ctx.ellipse(x, drawY, r * pulse, (r * 0.7) * pulse, 0, Math.PI, 0);
            ctx.fillStyle = grad;
            ctx.fill();

            // inner glow ring
            ctx.beginPath();
            ctx.ellipse(x, drawY, r * 0.5 * pulse, r * 0.3 * pulse, 0, Math.PI, 0);
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.fill();

            // ── Tentacles ───────────────────────────────────────────────
            for (let i = 0; i < NUM_TENTACLES; i++) {
                const tx0 = x - (r - 4) + (i * (r * 2 - 8) / (NUM_TENTACLES - 1));
                const phaseDelta = (i / NUM_TENTACLES) * Math.PI * 2;
                const wiggle = Math.sin(t * 2.5 + phaseDelta) * 8;
                const len = 20 + Math.abs(Math.sin(t * 1.5 + phaseDelta)) * 12;

                ctx.beginPath();
                ctx.moveTo(tx0, drawY);
                ctx.bezierCurveTo(
                    tx0 + wiggle * 0.5, drawY + len * 0.4,
                    tx0 - wiggle, drawY + len * 0.75,
                    tx0 + wiggle * 0.3, drawY + len
                );
                ctx.strokeStyle = `rgba(92,122,31,${0.25 + Math.abs(Math.sin(t + phaseDelta)) * 0.3})`;
                ctx.lineWidth = 1.5;
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            // ── Two small eyes ──────────────────────────────────────────
            const eyeY = drawY - 6;
            ctx.fillStyle = 'rgba(10,10,10,0.7)';
            ctx.beginPath();
            ctx.arc(x - 5, eyeY, 2, 0, Math.PI * 2);
            ctx.arc(x + 5, eyeY, 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            t += 0.022;
            rafId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="creature-canvas" />;
}
