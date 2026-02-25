import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RollingHeading = ({ text, className }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`${className} rolling-container`} style={{ position: 'relative', overflow: 'hidden', height: '1.2em', display: 'flex', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'absolute', whiteSpace: 'nowrap' }}
                >
                    {text}
                </motion.span>
            </AnimatePresence>
            {/* Invisible spacer to maintain height */}
            <span style={{ opacity: 0 }}>{text}</span>
        </div>
    );
};

export default RollingHeading;
