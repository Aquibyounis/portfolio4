import React from 'react';
import { motion } from 'framer-motion';
import RollingHeading from './RollingHeading';
import { services } from '../data/projects';
import './Services.css';

export default function Services() {
    return (
        <section className="services-section">
            <div className="divider" />
            <div className="services-inner">
                <motion.div
                    className="services-header"
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }} viewport={{ once: true }}
                >
                    <span className="section-label">/SERVICES</span>
                    <RollingHeading text="Digital Solutions." className="services-title" />
                </motion.div>

                <div className="services-grid">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            className="service-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                        >
                            <div className="service-card-top">
                                <span className="service-tag accent">{s.tag}</span>
                                <h3 className="service-title">{s.title}</h3>
                            </div>
                            <p className="service-body">{s.body}</p>
                            <div className="service-tech-row">
                                {s.tech.map(t => (
                                    <span key={t} className="service-tech">{t}</span>
                                ))}
                            </div>
                            <div className="service-arrow">→</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
