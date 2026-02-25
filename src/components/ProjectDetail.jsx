import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import './ProjectDetail.css';

export default function ProjectDetail({ project, onClose }) {
    // Lock body scroll when panel is open
    useEffect(() => {
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyHeight = document.body.style.height;
        const originalHtmlHeight = document.documentElement.style.height;

        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.height = '100%';
        document.documentElement.style.height = '100%';
        document.body.classList.add('no-momentum');

        if (scrollBarWidth > 0) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.height = originalBodyHeight;
            document.documentElement.style.height = originalHtmlHeight;
            document.body.style.paddingRight = '0px';
            document.body.classList.remove('no-momentum');
        };
    }, []);

    // Escape key to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!project) return null;

    const content = (
        <motion.div
            className="pd-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="pd-full-screen"
                initial={{ y: '100%', borderRadius: '2rem 2rem 0 0' }}
                animate={{ y: 0, borderRadius: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="pd-close-btn" onClick={onClose} aria-label="Close project">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="pd-content-inner">
                    <header className="pd-header">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="pd-meta"
                        >
                            <span className="pd-number">{project.number}</span>
                            <span className="pd-category">{project.category.toUpperCase()}</span>
                            {project.buildType && (
                                <span className={`pd-type-tag ${project.buildType}`}>
                                    {project.buildType === 'vibe' ? 'VIBE CODED' : 'CODED'}
                                </span>
                            )}
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="pd-title"
                        >
                            {project.title}<span className="accent">.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="pd-tagline"
                        >
                            {project.tagline}
                        </motion.p>
                    </header>

                    <div className="pd-grid">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="pd-image-section"
                        >
                            <div className="pd-image-placeholder" style={{ backgroundColor: project.color }}>
                                <span>{project.title[0]}</span>
                            </div>
                            <div className="pd-tech-stack">
                                <p className="pd-section-label">TECH STACK</p>
                                <div className="pd-tech-pills">
                                    {project.tech.map((t) => (
                                        <span key={t} className="pd-tech-pill">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="pd-details"
                        >
                            <div className="pd-info-block">
                                <p className="pd-section-label">OVERVIEW</p>
                                <p>{project.overview}</p>
                            </div>
                            <div className="pd-info-block">
                                <p className="pd-section-label">THE CHALLENGE</p>
                                <p>{project.challenge}</p>
                            </div>
                            <div className="pd-info-block">
                                <p className="pd-section-label">OUTCOME</p>
                                <p>{project.outcome}</p>
                            </div>

                            {project.live && project.live !== '#' && (
                                <a href={project.live} target="_blank" rel="noreferrer" className="btn-accent pd-live-link">
                                    VIEW LIVE PROJECT →
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );

    return createPortal(content, document.body);
}
