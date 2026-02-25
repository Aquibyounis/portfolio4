import React from 'react';
import './Marquee.css';

export default function Marquee() {
    const strip = [
        'AQUIB YOUNIS', '★', 'FULL-STACK DEV', '★', 'AI BUILDER', '★',
        'REACT', '★', 'NEXT.JS', '★', 'NODE.JS', '★', 'GEMINI API', '★',
        'THREE.JS', '★', 'FRAMER MOTION', '★',
    ];

    return (
        <section className="marquee-section">
            <div className="divider" />
            <div className="marquee-track-wrap">
                <div className="marquee-track">
                    {[...strip, ...strip].map((item, i) => (
                        <span
                            key={i}
                            className={`marquee-item ${item === '★' ? 'marquee-star accent' : ''}`}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
            <div className="divider" />
        </section>
    );
}
