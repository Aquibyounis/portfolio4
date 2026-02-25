import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

// A(top), Q(bottom), U(top), I(bottom), B(top)
const LETTERS = [
    { char: 'A', dir: -1 },
    { char: 'Q', dir: 1 },
    { char: 'U', dir: -1 },
    { char: 'I', dir: 1 },
    { char: 'B', dir: -1 },
];

export default function Loader({ onDone }) {
    // phase: 'assemble' → wait 2s → 'lift' (curtain slides up) → done
    const [phase, setPhase] = useState('assemble');

    useEffect(() => {
        // After 2s, start the curtain-lift exit
        const t = setTimeout(() => setPhase('lift'), 2000);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    key="loader-curtain"
                    className="loader-overlay"
                    // Entry: instant (white screen)
                    initial={{ y: 0 }}
                    // Exit: slide UP like a curtain revealing the hero below
                    exit={{ y: '-100%' }}
                    transition={{
                        duration: 0.85,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    onAnimationComplete={(def) => {
                        // 'exit' fires once curtain slides away
                        if (phase === 'lift') {
                            setPhase('done');
                            onDone?.();
                        }
                    }}
                    animate={phase === 'lift' ? { y: '-100%' } : { y: 0 }}
                >
                    {/* Subtle radial glow */}
                    <div className="loader-glow" />

                    {/* The AQUIB name — letters enter from alternating directions */}
                    <div className="loader-letters">
                        {LETTERS.map((l, i) => (
                            <motion.span
                                key={l.char}
                                className="loader-char"
                                initial={{ y: l.dir * 200, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    delay: i * 0.09,
                                    duration: 0.7,
                                    type: 'spring',
                                    stiffness: 105,
                                    damping: 12,
                                }}
                            >
                                {l.char}
                            </motion.span>
                        ))}
                        <motion.span
                            className="loader-char loader-reg"
                            initial={{ y: -200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                delay: LETTERS.length * 0.09 + 0.05,
                                duration: 0.6,
                                type: 'spring',
                                stiffness: 95,
                                damping: 13,
                            }}
                        >
                            ®
                        </motion.span>
                    </div>

                    {/* Expanding line below name */}
                    <motion.div
                        className="loader-line"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Tagline */}
                    <motion.p
                        className="loader-tag"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.45 }}
                    >
                        Full-Stack Dev · AI Builder
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
