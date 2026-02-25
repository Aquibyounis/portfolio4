import React from 'react';
import { motion } from 'framer-motion';
import RollingHeading from './RollingHeading';
import { researchPaper } from '../data/projects';
import './ResearchPaper.css';

const ResearchPaper = () => {
    // researchPaper is an object in projects.js, not an array
    const paper = researchPaper;

    if (!paper) return null;

    return (
        <section className="research-section" id="research">
            <div className="divider" />
            <div className="research-inner">
                <motion.div
                    className="rp-header"
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }} viewport={{ once: true }}
                >
                    <span className="section-label">/PUBLICATION</span>
                    <RollingHeading text="Research & Papers." className="rp-title" />
                </motion.div>

                <motion.div
                    className="rp-card"
                    initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }} viewport={{ once: true }}
                >
                    <div className="rp-badge">JOURNAL PAPER</div>
                    <h3 className="rp-paper-title">{paper.title}</h3>
                    <div className="rp-meta">
                        <span className="rp-conference">{paper.journal || paper.conference}</span>
                        <span className="rp-year">{paper.year}</span>
                    </div>
                    <p className="rp-abstract">{paper.abstract}</p>

                    <div className="rp-links">
                        <a href={paper.link} target="_blank" rel="noreferrer" className="btn-accent">
                            READ FULL PAPER →
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ResearchPaper;
