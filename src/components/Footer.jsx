import React from 'react';
import './Footer.css';

export default function Footer() {
    const navLinks = [
        { label: '/ABOUT', href: '#about' },
        { label: '/EXPERTISE', href: '#expertise' },
        { label: '/WORKS', href: '#works' },
        { label: '/CONTACT', href: '#contact' },
    ];
    const socialLinks = [
        { label: 'GITHUB', href: 'https://github.com/Aquibyounis' },
        { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/aquib-younis-pula-6b205b275/' },
        { label: 'THREADS', href: 'https://www.threads.net/@code.pixelsx' },
        { label: 'INSTAGRAM', href: 'https://www.instagram.com/code.pixelsx/' },
        { label: 'YOUTUBE', href: 'https://www.youtube.com/channel/UCynAxHTTMS9zdGxY8tZkaQg' },
        { label: 'LEETCODE', href: 'https://leetcode.com/u/aquibyounis1/' },
        { label: 'TELEGRAM', href: 'https://t.me/codepixelsx' },
    ];

    return (
        <footer className="footer">
            <div className="divider" />
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a href="#hero" className="footer-logo">AQUIB<span className="accent">®</span></a>
                        <p className="footer-tagline">Full-Stack Developer & AI Builder</p>
                    </div>
                    <div className="footer-cols">
                        <div className="footer-col">
                            <p className="footer-col-label">NAVIGATION</p>
                            {navLinks.map(l => (
                                <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
                            ))}
                        </div>
                        <div className="footer-col">
                            <p className="footer-col-label">SOCIAL</p>
                            {socialLinks.map(l => (
                                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="footer-link">{l.label}</a>
                            ))}
                        </div>
                        <div className="footer-col">
                            <p className="footer-col-label">CONTACT</p>
                            <a href="mailto:aquibyounis2@gmail.com" className="footer-email accent">aquibyounis2@gmail.com</a>
                            <p className="footer-availability">
                                <span className="badge-dot-sm"></span> Available for projects
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-copy">@2025 Aquib Younis. All rights reserved.</p>
                    <p className="footer-built">Built with React <span className="accent">❤</span></p>
                </div>
            </div>
        </footer>
    );
}
