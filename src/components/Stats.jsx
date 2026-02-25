import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/projects';
import './Stats.css';

function Counter({ target, suffix }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
    return (
        <section className="stats-section">
            <div className="divider" />
            <div className="stats-inner">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        className="stat-item"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        viewport={{ once: true }}
                    >
                        <div className="stat-value accent">
                            <Counter target={s.value} suffix={s.suffix} />
                        </div>
                        <div className="stat-label">{s.label}</div>
                    </motion.div>
                ))}
            </div>
            <div className="divider" />
        </section>
    );
}
