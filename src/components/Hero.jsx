import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const chars = 'AQUIB'.split('');

const containerVar = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const charVar = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero() {
    return (
        <section className="hero" id="hero">
            {/* Availability badge */}
            <motion.div
                className="hero-badge"
                custom={0.1} variants={fadeUp} initial="hidden" animate="show"
            >
                <span className="badge-dot"></span>
                OPEN TO OPPORTUNITIES
            </motion.div>

            {/* Giant name */}
            <div className="hero-name-wrap" style={{ perspective: 1000 }}>
                <motion.div
                    className="hero-name"
                    variants={containerVar} initial="hidden" animate="show"
                >
                    {chars.map((c, i) => (
                        <motion.span key={i} className="hero-char" variants={charVar}>{c}</motion.span>
                    ))}
                    <motion.span className="hero-reg accent" variants={charVar}>®</motion.span>
                </motion.div>
            </div>

            {/* Center row: role + tagline */}
            <motion.div className="hero-meta" custom={0.6} variants={fadeUp} initial="hidden" animate="show">
                <p className="hero-role">Full-Stack Developer<br /><span className="accent">&</span> AI Builder</p>
                <div className="hero-meta-divider"></div>
                <p className="hero-tagline">
                    Building modern, conversion-focused<br />web apps and AI-powered products.
                </p>
            </motion.div>

            {/* CTAs */}
            <motion.div className="hero-ctas" custom={0.9} variants={fadeUp} initial="hidden" animate="show">
                <a href="#works" className="btn-accent">VIEW WORK ↓</a>
                <a href="#contact" className="btn-outline">CONTACT</a>
            </motion.div>

            {/* Scroll cue */}
            <motion.div className="hero-scroll" custom={1.2} variants={fadeUp} initial="hidden" animate="show">
                <span className="scroll-line"></span>
                <span className="section-label">SCROLL</span>
            </motion.div>
        </section>
    );
}
