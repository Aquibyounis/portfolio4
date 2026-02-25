import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CTA.css';

const SOCIAL = [
    { label: 'GitHub', href: 'https://github.com/Aquibyounis', icon: 'fa-brands fa-github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aquib-younis-pula-6b205b275/', icon: 'fa-brands fa-linkedin' },
    { label: 'Threads', href: 'https://www.threads.net/@code.pixelsx', icon: 'fa-brands fa-threads' },
    { label: 'Instagram', href: 'https://www.instagram.com/code.pixelsx/', icon: 'fa-brands fa-instagram' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCynAxHTTMS9zdGxY8tZkaQg', icon: 'fa-brands fa-youtube' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/aquibyounis1/', icon: 'fa-solid fa-terminal' },
    { label: 'Telegram', href: 'https://t.me/codepixelsx', icon: 'fa-brands fa-telegram' },
];

const REAL_EMAIL = 'aquibyounis2@gmail.com';

function buildMailto({ subject, body }) {
    return `mailto:${REAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function CTA() {
    const [form, setForm] = useState({ name: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSend = () => {
        if (!form.message.trim()) return;
        const subject = `Portfolio Contact from ${form.name || 'Visitor'}`;
        const body = `Hi Aquib,\n\nMy name is ${form.name || 'a visitor'}.\n\n${form.message}\n\nBest regards,\n${form.name}`;
        window.location.href = buildMailto({ subject, body });
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <section className="cta-section" id="contact">
            <div className="divider" />
            <div className="cta-inner">

                {/* Heading */}
                <motion.div
                    className="cta-label-row"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }} viewport={{ once: true }}
                >
                    <span className="section-label white">/CONTACT</span>
                </motion.div>

                <motion.h2
                    className="cta-heading"
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
                >
                    MAKE<br /><span className="accent">IMPACT</span><span className="cta-dot">.</span>
                </motion.h2>

                <div className="cta-body">
                    {/* ── Contact Form ── */}
                    <motion.div
                        className="cta-form-wrap"
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true }}
                    >
                        <p className="cta-form-label">Send me a message</p>

                        <div className="cta-field">
                            <label className="cta-field-label">YOUR NAME</label>
                            <input
                                className="cta-input" type="text" name="name"
                                placeholder="Aquib Younis" value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="cta-field">
                            <label className="cta-field-label">MESSAGE</label>
                            <textarea
                                className="cta-input cta-textarea" name="message" rows={5}
                                placeholder="Tell me about your project or idea…" value={form.message}
                                onChange={handleChange}
                            />
                        </div>

                        <motion.button
                            className={`cta-send-btn ${sent ? 'cta-sent' : ''}`}
                            onClick={handleSend}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            disabled={!form.message.trim()}
                        >
                            {sent ? '✓ OPENING MAIL APP…' : 'SEND VIA EMAIL →'}
                        </motion.button>

                        <p className="cta-direct-link">
                            or mail directly: <a href={`mailto:${REAL_EMAIL}`} className="accent">{REAL_EMAIL}</a>
                        </p>
                    </motion.div>

                    {/* ── Social Links ── */}
                    <motion.div
                        className="cta-social-wrap"
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}
                    >
                        <p className="cta-form-label">Find me on</p>
                        <div className="cta-socials">
                            {SOCIAL.map((s, i) => (
                                <motion.a
                                    key={s.label} href={s.href}
                                    target="_blank" rel="noopener noreferrer"
                                    className="cta-social-link"
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -3 }}
                                >
                                    <i className={s.icon} />
                                    <span>{s.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
