import React from 'react';
import { motion } from 'framer-motion';
import { tools, expertise } from '../data/projects';
import './Tools.css';

export default function Tools() {
    return (
        <section className="tools-section">
            <div className="tools-inner">
                <motion.div
                    className="tools-header"
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }} viewport={{ once: true }}
                >
                    <span className="section-label">/TOOLS & INTEGRATIONS</span>
                    <h2 className="tools-title">The stack I<br />build with<span className="accent">.</span></h2>
                </motion.div>

                <div className="tools-grid-wrap">
                    {/* Tools */}
                    <div>
                        <p className="tools-col-label">TECHNOLOGIES</p>
                        <div className="tools-grid">
                            {tools.map((t, i) => (
                                <motion.span
                                    key={t}
                                    className="tool-chip"
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.04 }}
                                    viewport={{ once: true }}
                                >
                                    {t}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Expertise */}
                    <div>
                        <p className="tools-col-label">EXPERTISE</p>
                        <div className="tools-grid">
                            {expertise.map((e, i) => (
                                <motion.span
                                    key={e}
                                    className="tool-chip tool-chip-accent"
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.08 }}
                                    viewport={{ once: true }}
                                >
                                    {e}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
