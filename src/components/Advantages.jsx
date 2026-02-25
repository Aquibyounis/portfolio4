import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { advantages } from '../data/projects';
import './Advantages.css';

export default function Advantages() {
    const [open, setOpen] = useState(null);

    return (
        <section className="advantages" id="expertise">
            <div className="divider" />
            <div className="adv-inner">
                <motion.div
                    className="adv-header"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }} viewport={{ once: true }}
                >
                    <span className="section-label">/ADVANTAGES</span>
                    <h2 className="adv-title">Why work<br />with me<span className="accent">.</span></h2>
                </motion.div>

                <div className="adv-list">
                    {advantages.map((a, i) => (
                        <motion.div
                            key={i}
                            className={`adv-item ${open === i ? 'open' : ''}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => setOpen(open === i ? null : i)}
                        >
                            <div className="adv-row">
                                <span className="adv-number accent">{a.number}</span>
                                <h3 className="adv-name">{a.title}</h3>
                                <span className="adv-arrow">{open === i ? '−' : '+'}</span>
                            </div>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.p
                                        className="adv-body"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        {a.body}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
