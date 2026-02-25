import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatWidget.css';

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hey! I'm Peanut 🥜 — ask me anything about Aquib's work!" },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const simulateTyping = (text) => {
        text = String(text);
        let index = 0;
        setMessages(prev => [...prev, { sender: 'bot', text: '', typing: true }]);
        const iv = setInterval(() => {
            setMessages(prev => {
                const last = prev[prev.length - 1];
                return [...prev.slice(0, -1), { ...last, text: last.text + text.charAt(index) }];
            });
            index++;
            if (index >= text.length) {
                clearInterval(iv);
                setMessages(prev => {
                    const last = prev[prev.length - 1];
                    return [...prev.slice(0, -1), { ...last, typing: false }];
                });
                setIsTyping(false);
            }
        }, 28);
    };

    const send = async () => {
        if (!input.trim()) return;
        const q = input.trim();
        setMessages(prev => [...prev, { sender: 'user', text: q }]);
        setInput('');
        setIsTyping(true);
        try {
            const res = await fetch('http://localhost:8500/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: q }),
            });
            const data = await res.json();
            const txt = typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
            simulateTyping(txt);
        } catch {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, the server seems offline right now 🥲' }]);
            setIsTyping(false);
        }
    };

    const onKey = e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    };

    return (
        <div className="cw-root">
            {/* Floating toggle */}
            <motion.button
                className="cw-fab"
                onClick={() => setOpen(o => !o)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                title="Chat with Peanut AI"
            >
                {open ? '✕' : '🥜'}
                {!open && messages.length > 1 && (
                    <span className="cw-unread-dot" />
                )}
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="cw-panel"
                        initial={{ opacity: 0, scale: 0.88, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 20 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                    >
                        <div className="cw-header">
                            <span className="cw-avatar">🥜</span>
                            <div>
                                <p className="cw-name">Peanut</p>
                                <p className="cw-status">AI · Aquib's Project</p>
                            </div>
                        </div>

                        <div className="cw-messages">
                            {messages.map((m, i) => (
                                <div key={i} className={`cw-msg cw-msg-${m.sender}`}>
                                    {m.text}
                                    {m.typing && m.text === '' && (
                                        <span className="cw-dots">
                                            <span /><span /><span />
                                        </span>
                                    )}
                                </div>
                            ))}
                            {isTyping && messages[messages.length - 1]?.text === '' && null}
                            <div ref={endRef} />
                        </div>

                        <div className="cw-input-row">
                            <textarea
                                className="cw-input"
                                rows={1}
                                placeholder="Ask me anything…"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={onKey}
                            />
                            <button className="cw-send" onClick={send} disabled={!input.trim()}>→</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
