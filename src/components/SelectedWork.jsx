import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectDetail from './ProjectDetail';
import RollingHeading from './RollingHeading'; // Added RollingHeading import
import './SelectedWork.css';

const FILTERS = [
    { key: 'all', label: 'ALL', icon: '◈' },
    { key: 'coded', label: 'CODED', icon: '⌨' },
    { key: 'vibe', label: 'VIBE CODED', icon: '✦' },
];

const CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'web', label: 'Web' },
    { key: 'ai', label: 'AI / ML' },
];

export default function SelectedWork() {
    const [selected, setSelected] = useState(null);
    const [buildFilter, setBuildFilter] = useState('all');
    const [catFilter, setCatFilter] = useState('all');

    const filtered = projects.filter(p => {
        const matchBuild = buildFilter === 'all' || p.buildType === buildFilter;
        const matchCat = catFilter === 'all' || p.category === catFilter;
        return matchBuild && matchCat;
    });

    return (
        <>
            <section className="works" id="works">
                <div className="divider" />
                <div className="works-inner">
                    <motion.div
                        className="works-header"
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }} viewport={{ once: true }}
                    >
                        <span className="section-label">/WORKS</span>
                        <RollingHeading text="Selected Projects." className="works-title" />
                    </motion.div>

                    <div className="works-layout">
                        {/* ── LEFT SIDEBAR FILTER BAR ── */}
                        <div className="works-sidebar">
                            <div className="sidebar-group">
                                <p className="sidebar-group-label">BUILD TYPE</p>
                                <div className="sidebar-pills">
                                    {FILTERS.map(f => (
                                        <button
                                            key={f.key}
                                            className={`sidebar-pill ${buildFilter === f.key ? 'pill-active' : ''}`}
                                            onClick={() => setBuildFilter(f.key)}
                                        >
                                            <span className="pill-icon">{f.icon}</span>
                                            <span>{f.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-divider" />

                            <div className="sidebar-group">
                                <p className="sidebar-group-label">CATEGORY</p>
                                <div className="sidebar-pills">
                                    {CATEGORIES.map(c => (
                                        <button
                                            key={c.key}
                                            className={`sidebar-pill ${catFilter === c.key ? 'pill-active' : ''}`}
                                            onClick={() => setCatFilter(c.key)}
                                        >
                                            {c.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-count">
                                <span className="count-num accent">{filtered.length}</span>
                                <span className="count-label">Projects</span>
                            </div>
                        </div>

                        {/* ── PROJECT GRID ── */}
                        <div className="works-grid-wrap">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={buildFilter + catFilter}
                                    className="works-list"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {filtered.map((p, i) => (
                                        <motion.div
                                            key={p.slug}
                                            className="work-item"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.45, delay: i * 0.065 }}
                                            onClick={() => setSelected(p)}
                                        >
                                            <div className="work-card-bg" style={{ '--project-color': p.color }}>
                                                {/* hover overlay */}
                                                <div className="work-card-overlay">
                                                    <span className="work-open">VIEW PROJECT →</span>
                                                </div>

                                                {/* Build type badge */}
                                                <div className={`work-build-badge ${p.buildType === 'vibe' ? 'badge-vibe' : 'badge-coded'}`}>
                                                    {p.buildType === 'vibe' ? '✦ VIBE' : '⌨ CODED'}
                                                </div>

                                                <div className="work-card-content">
                                                    <div className="work-card-top">
                                                        <span className="work-number accent">{p.number}</span>
                                                        <span className="work-tag" style={{ color: p.color, borderColor: p.color }}>{p.tag}</span>
                                                    </div>
                                                    <h3 className="work-title">{p.title}</h3>
                                                    <p className="work-tagline">{p.tagline}</p>
                                                    <div className="work-tech-row">
                                                        {p.tech.slice(0, 3).map(t => (
                                                            <span key={t} className="work-tech-chip">{t}</span>
                                                        ))}
                                                        {p.tech.length > 3 && (
                                                            <span className="work-tech-chip">+{p.tech.length - 3}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {filtered.length === 0 && (
                                        <motion.p
                                            className="works-empty"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        >
                                            No projects match this filter.
                                        </motion.p>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selected && (
                    <ProjectDetail project={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
