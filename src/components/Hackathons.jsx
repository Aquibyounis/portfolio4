import React from 'react';
import { motion } from 'framer-motion';
import RollingHeading from './RollingHeading';
import { hackathons } from '../data/projects';
import './Hackathons.css';

export default function Hackathons() {
    return (
        <section className="hackathons-section" id="hackathons">
            <div className="divider" />
            <div className="hack-inner">
                <motion.div
                    className="hack-header"
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }} viewport={{ once: true }}
                >
                    <span className="section-label">/RECOGNITION</span>
                    <RollingHeading text="Hackathons & Events." className="h-title" />
                </motion.div>

                <div className="hack-list">
                    {hackathons.map((h, i) => (
                        <motion.div
                            key={i}
                            className="hack-item"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {/* Accent stripe */}
                            <div className="hack-stripe" style={{ background: h.color }} />

                            <div className="hack-content">
                                <div className="hack-top-row">
                                    <div className="hack-badges">
                                        <span className="hack-number accent">{h.number}</span>
                                        <span
                                            className="hack-result-badge"
                                            style={{ color: h.color, borderColor: h.color, background: `${h.color}15` }}
                                        >
                                            {h.result}
                                        </span>
                                    </div>
                                    <span className="hack-year-tag">{h.year}</span>
                                </div>

                                <h3 className="hack-name">{h.title}</h3>
                                <p className="hack-organizer">{h.organizer}</p>
                                <p className="hack-desc">{h.description}</p>

                                <div className="hack-tech-row">
                                    {h.tech.map(t => (
                                        <motion.span
                                            key={t}
                                            className="hack-chip"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {t}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
