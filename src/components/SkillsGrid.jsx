import { motion } from 'framer-motion';
import RollingHeading from './RollingHeading';
import './SkillsGrid.css';

const skillCategories = [
    {
        id: 'ai', label: 'AI', color: '#8b5cf6',
        skills: [
            { name: 'Python', icon: 'fa-brands fa-python', color: '#3776AB' },
            { name: 'NumPy', icon: 'fa-solid fa-table', color: '#4dabcf' },
            { name: 'Pandas', icon: 'fa-solid fa-chart-bar', color: '#150458' },
            { name: 'Machine Learning', icon: 'fa-solid fa-brain', color: '#8b5cf6' },
            { name: 'Deep Learning', icon: 'fa-solid fa-network-wired', color: '#a855f7' },
            { name: 'NLP', icon: 'fa-solid fa-language', color: '#6366f1' },
        ],
    },
    {
        id: 'agentic', label: 'Agentic AI', color: '#f97316',
        skills: [
            { name: 'n8n', icon: 'fa-solid fa-diagram-project', color: '#ea5520' },
            { name: 'RAG', icon: 'fa-solid fa-database', color: '#f97316' },
        ],
    },
    {
        id: 'llm', label: 'LLM & GenAI', color: '#a855f7',
        skills: [
            { name: 'LangChain', icon: 'fa-solid fa-link', color: '#1c7c54' },
            { name: 'Vector DB', icon: 'fa-solid fa-layer-group', color: '#a855f7' },
            { name: 'ChromaDB', icon: 'fa-solid fa-circle-nodes', color: '#e94560' },
            { name: 'FAISS', icon: 'fa-solid fa-magnifying-glass', color: '#6b7280' },
            { name: 'Ollama', icon: 'fa-solid fa-robot', color: '#222' },
        ],
    },
    {
        id: 'web', label: 'Web Dev (MERN)', color: '#10b981',
        skills: [
            { name: 'MongoDB', icon: 'fa-solid fa-leaf', color: '#47a248' },
            { name: 'Express.js', icon: 'fa-solid fa-server', color: '#888' },
            { name: 'React.js', icon: 'fa-brands fa-react', color: '#61dafb' },
            { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#339933' },
            { name: 'HTML', icon: 'fa-brands fa-html5', color: '#e34f26' },
            { name: 'CSS', icon: 'fa-brands fa-css3-alt', color: '#1572b6' },
            { name: 'REST API', icon: 'fa-solid fa-plug', color: '#10b981' },
            { name: 'FastAPI', icon: 'fa-solid fa-bolt', color: '#009688' },
        ],
    },
    {
        id: 'lang', label: 'Languages', color: '#06b6d4',
        skills: [
            { name: 'Python', icon: 'fa-brands fa-python', color: '#3776AB' },
            { name: 'Java', icon: 'fa-brands fa-java', color: '#f89820' },
            { name: 'MySQL', icon: 'fa-solid fa-database', color: '#00758f' },
        ],
    },
    {
        id: 'cloud', label: 'DevOps & Cloud', color: '#c9a645',
        skills: [
            { name: 'AWS', icon: 'fa-brands fa-aws', color: '#ff9900' },
            { name: 'EC2', icon: 'fa-solid fa-server', color: '#f97316' },
            { name: 'S3', icon: 'fa-solid fa-bucket', color: '#e25444' },
            { name: 'IAM', icon: 'fa-solid fa-user-shield', color: '#c9a645' },
        ],
    },
    {
        id: 'tools', label: 'Tools', color: '#ec4899',
        skills: [
            { name: 'Jupyter Notebook', icon: 'fa-solid fa-book-open', color: '#f37626' },
            { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#f05032' },
            { name: 'GitHub', icon: 'fa-brands fa-github', color: '#333' },
            { name: 'Google Colab', icon: 'fa-brands fa-google', color: '#f4b400' },
        ],
    },
];

export default function SkillsGrid() {
    return (
        <section className="skills-section">
            <div className="divider" />
            <div className="skills-inner">
                <motion.div
                    className="skills-header"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <span className="section-label">/SKILLS</span>
                    <RollingHeading text="Technology Stack." className="skills-title" />
                </motion.div>

                <div className="skills-flat">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            className="skill-row"
                            style={{ '--cat-color': cat.color }}
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                            viewport={{ once: true }}
                        >
                            {/* Category label */}
                            <div className="skill-row-label">
                                <span className="skill-row-name">{cat.label}</span>
                            </div>

                            <div className="skill-row-dot" />

                            {/* Skill pills with icons */}
                            <div className="skill-row-pills">
                                {cat.skills.map((s, j) => (
                                    <motion.span
                                        key={s.name}
                                        className="skill-row-pill"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 + j * 0.04, duration: 0.3 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -2, scale: 1.05 }}
                                        style={{ '--skill-icon-color': s.color }}
                                    >
                                        <i className={s.icon} style={{ color: s.color, fontSize: '0.85rem' }} />
                                        {s.name}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
