import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [lastY, setLastY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return false;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setVisible(y < lastY || y < 80);
            setLastY(y);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastY]);

    const links = ['ABOUT', 'EXPERTISE', 'WORKS', 'CONTACT'];

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    className="navbar"
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    <a href="#hero" className="nav-logo">AQUIB<span className="accent">®</span></a>

                    <ul className="nav-links hide-mobile">
                        {links.map(l => (
                            <li key={l}>
                                <a href={`#${l.toLowerCase()}`} className="nav-link">/{l}</a>
                            </li>
                        ))}
                    </ul>

                    {/* Theme toggle */}
                    <button
                        className="theme-toggle"
                        onClick={() => setDark(d => !d)}
                        aria-label="Toggle dark mode"
                        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        <i className={dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
                    </button>

                    <button className="hamburger hide-desktop" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                        <span></span><span></span>
                    </button>
                </motion.nav>
            )}

            {menuOpen && (
                <motion.div className="mobile-menu"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    {links.map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} className="mobile-link" onClick={() => setMenuOpen(false)}>/{l}</a>
                    ))}

                </motion.div>
            )}
        </AnimatePresence>
    );
}
