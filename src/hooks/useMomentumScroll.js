import { useEffect } from 'react';

/**
 * Custom momentum scroll — after the user stops scrolling,
 * the page continues with ~100px of decelerated inertia.
 */
export default function useMomentumScroll() {
    useEffect(() => {
        let velocity = 0;
        let rafId = null;
        let lastWheelTime = 0;

        const FRICTION = 0.88;      // how fast momentum decays (lower = longer coast)
        const MIN_VELOCITY = 0.1;   // stop when velocity is tiny

        function step() {
            if (Math.abs(velocity) < MIN_VELOCITY) {
                velocity = 0;
                rafId = null;
                return;
            }
            window.scrollBy({ top: velocity, behavior: 'instant' });
            velocity *= FRICTION;
            rafId = requestAnimationFrame(step);
        }

        function onWheel(e) {
            e.preventDefault();

            const now = performance.now();
            const gap = now - lastWheelTime;
            lastWheelTime = now;

            // If gap is large (new gesture), reset velocity
            if (gap > 150) velocity = 0;

            // Accumulate — scale down deltaY so very fast wheels don't overshoot
            velocity += e.deltaY * 0.55;

            // Clamp to avoid insane jumps on magic trackpad
            velocity = Math.max(-120, Math.min(120, velocity));

            if (!rafId) rafId = requestAnimationFrame(step);
        }

        window.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', onWheel);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);
}
