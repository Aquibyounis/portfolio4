import React from 'react';
import { motion } from 'framer-motion';
import RollingHeading from './RollingHeading';
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    CartesianGrid, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import './KnowledgeDashboard.css';

const data = [
    { skill: 'Python', knowledge: 75 },
    { skill: 'ML/DL/NLP', knowledge: 65 },
    { skill: 'LangChain', knowledge: 75 },
    { skill: 'ChromaDB', knowledge: 60 },
    { skill: 'HuggingFace', knowledge: 50 },
    { skill: 'n8n', knowledge: 75 },
    { skill: 'GitHub', knowledge: 90 },
    { skill: 'AWS EC2', knowledge: 70 },
    { skill: 'MongoDB', knowledge: 80 },
    { skill: 'SQL', knowledge: 75 },
    { skill: 'ReactJS', knowledge: 90 },
    { skill: 'Java', knowledge: 75 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="kd-tooltip">
                <p className="kd-tooltip-label">{label}</p>
                <p className="kd-tooltip-value">{payload[0].value}%</p>
            </div>
        );
    }
    return null;
};

export default function KnowledgeDashboard() {
    return (
        <section className="kd-section" id="expertise">
            <div className="divider" />
            <div className="kd-inner">
                <motion.div
                    className="kd-header"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <span className="section-label">/KNOWLEDGE</span>
                    <RollingHeading text="Knowledge Dashboard." className="kd-title" />
                </motion.div>

                <motion.div
                    className="kd-card"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                >
                    {/* Accent top bar */}
                    <div className="kd-top-bar" />

                    <div className="kd-chart-wrap">
                        <ResponsiveContainer width="100%" height={340}>
                            <LineChart
                                data={data}
                                margin={{ top: 16, right: 24, left: 0, bottom: 60 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="4 4"
                                    stroke="rgba(0,0,0,0.06)"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="skill"
                                    tick={{ fill: '#6b6b6b', fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }}
                                    axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                                    tickLine={false}
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                />
                                <YAxis
                                    domain={[0, 100]}
                                    tick={{ fill: '#6b6b6b', fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={v => `${v}%`}
                                    width={42}
                                />
                                <ReferenceLine y={80} stroke="rgba(92,122,31,0.2)" strokeDasharray="4 4" />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,0,0,0.08)', strokeWidth: 1 }} />
                                <Line
                                    type="monotone"
                                    dataKey="knowledge"
                                    stroke="#5c7a1f"
                                    strokeWidth={2.5}
                                    dot={{ r: 4, fill: '#5c7a1f', strokeWidth: 0 }}
                                    activeDot={{ r: 7, fill: '#c8f65d', stroke: '#5c7a1f', strokeWidth: 2 }}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Summary chips */}
                    <div className="kd-summary-row">
                        {[
                            { label: 'Top Skill', value: 'ReactJS / GitHub — 90%' },
                            { label: 'Avg Score', value: '73%' },
                            { label: 'Focus Area', value: 'AI / LLMs' },
                        ].map(s => (
                            <div key={s.label} className="kd-summary-chip">
                                <span className="kd-chip-label">{s.label}</span>
                                <span className="kd-chip-value">{s.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
