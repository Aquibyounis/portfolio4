import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RollingHeading from './RollingHeading';
import './Certificates.css';

/* ─── Cert images are served from public/certs/ ─────────────────────────────
   Copy c1.png … c7.jpg into:   portfolio-aquib/public/certs/
   They'll load at runtime via the URL — no webpack import needed.
   Example command: copy your images to public/certs/c1.png etc.
──────────────────────────────────────────────────────────────────────────── */
const PUB = process.env.PUBLIC_URL + '/certs/';

const certificateData = [
    {
        id: 1, title: 'Oracle Generative AI', image: `${PUB}c6.png`,
        issuer: 'Oracle', year: '2025', category: 'AI / ML',
        description: 'Completed Oracle GEN AI certification. Finally got a grip in LLM and AI along with VectorDB and RAG. This certification validated my expertise in modern AI technologies and cloud-based generative AI solutions.',
    },
    {
        id: 2, title: 'MERN Full Stack', image: `${PUB}c1.png`,
        issuer: 'SmartBridge', year: '2024', category: 'Web Dev',
        description: 'Completed MERN full stack course of duration 2 months. Been through highs and lows frequently. Complete mastering over multiple topics is essential in the modern world of AI and competition.',
    },
    {
        id: 3, title: 'MongoDB Certified', image: `${PUB}c2.png`,
        issuer: 'MongoDB University', year: '2024', category: 'Database',
        description: 'A self-paced learning path directly connected to MongoDB website. Mastered skills in MongoDB including aggregations, indexing, and schema design. Starting of my database learning journey.',
    },
    {
        id: 4, title: 'Project Completion', image: `${PUB}c3.png`,
        issuer: 'SmartBridge', year: '2024', category: 'Web Dev',
        description: 'My first ever team project on real-life basis. Learned team management, work distribution, and collaboration with other campus students. Felt 100% satisfied after completing the website.',
    },
    {
        id: 5, title: 'AWS Cloud Architecture Badge', image: `${PUB}c4.png`,
        issuer: 'AWS', year: '2024', category: 'Cloud',
        description: 'AWS Cloud Architecture badge. Completed the AWS cloud LAB with real-time hands-on experience in cloud infrastructure, scalability patterns, and best practices.',
    },
    {
        id: 6, title: 'Oracle GenAI Badge', image: `${PUB}c7.jpg`,
        issuer: 'Oracle', year: '2024', category: 'AI / ML',
        description: 'Completed Oracle GEN AI course of self-based learning path. Gained experience in hands-on lab for RAG, VectorDB, and cloud integration of Oracle with AI models.',
    },
    {
        id: 7, title: 'AWS Foundations Badge', image: `${PUB}c5.png`,
        issuer: 'AWS', year: '2024', category: 'Cloud',
        description: 'AWS Cloud Foundations badge with real-time experience in AWS Labs including EC2, S3, VPC, IAM roles, users, policies, databases like RDS, Aurora, and serverless deployments with Lambda.',
    },
];

const categoryColors = {
    'AI / ML': '#8b5cf6', 'Web Dev': '#10b981',
    'Database': '#f97316', 'Cloud': '#c9a645',
};

/* ─── Single Card ─────────────────────────────────────────────────────────── */
const CertCard = ({ cert, index, onOpen }) => (
    <motion.div
        className="cert-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.07 }}
        viewport={{ once: true }}
        whileHover={{ y: -6, scale: 1.02 }}
        onClick={() => onOpen(cert)}
        style={{ '--cat-color': categoryColors[cert.category] || '#5c7a1f' }}
    >
        {/* Category stripe */}
        <div className="cert-stripe" />
        <div className="cert-img-wrap">
            {cert.image
                ? <img src={cert.image} alt={cert.title} className="cert-img" />
                : <div className="cert-img-placeholder">{cert.title.charAt(0)}</div>
            }
        </div>
        <div className="cert-body">
            <span className="cert-cat-badge" style={{ color: categoryColors[cert.category] || '#5c7a1f' }}>
                {cert.category}
            </span>
            <h3 className="cert-name">{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer} · {cert.year}</p>
        </div>
        <div className="cert-hover-label">CLICK TO VIEW →</div>
    </motion.div>
);

/* ─── Modal ───────────────────────────────────────────────────────────────── */
const CertModal = ({ cert, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = e => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    }, [onClose]);

    return (
        <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="cert-modal-box"
                initial={{ scale: 0.85, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 40, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                onClick={e => e.stopPropagation()}
            >
                <button className="cert-modal-close" onClick={onClose}>✕</button>
                {cert.image
                    ? <img src={cert.image} alt={cert.title} className="cert-modal-img" />
                    : <div className="cert-modal-img-placeholder">{cert.title}</div>
                }
                <div className="cert-modal-info">
                    <span className="cert-modal-cat" style={{ color: categoryColors[cert.category] || '#5c7a1f' }}>
                        {cert.category}
                    </span>
                    <h2 className="cert-modal-title">{cert.title}</h2>
                    <p className="cert-modal-meta">{cert.issuer} · {cert.year}</p>
                    <p className="cert-modal-desc">{cert.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ─── Main Section ────────────────────────────────────────────────────────── */
export default function Certificates() {
    const [active, setActive] = useState(null);

    return (
        <section className="certs-section" id="certs">
            <div className="divider" />
            <div className="certs-inner">
                <motion.div
                    className="certs-header"
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }} viewport={{ once: true }}
                >
                    <span className="section-label">/VALIDATION</span>
                    <RollingHeading text="Certifications & Courses." className="c-title" />
                </motion.div>

                <div className="certs-grid">
                    {certificateData.map((cert, i) => (
                        <CertCard key={cert.id} cert={cert} index={i} onOpen={setActive} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {active && <CertModal cert={active} onClose={() => setActive(null)} />}
            </AnimatePresence>
        </section>
    );
}
