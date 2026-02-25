import { motion } from 'framer-motion';
import RollingHeading from './RollingHeading';
import './About.css';

const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const slideRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
    return (
        <section className="about" id="about">
            <div className="divider" />
            <div className="about-inner">
                <motion.div
                    className="about-left"
                    variants={slideLeft} initial="hidden"
                    whileInView="show" viewport={{ once: true, amount: 0.3 }}
                >
                    <span className="section-label">/ABOUT</span>
                    <RollingHeading text="Empower Code." className="about-heading" />
                </motion.div>

                <motion.div
                    className="about-right"
                    variants={slideRight} initial="hidden"
                    whileInView="show" viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="about-bio">
                        I design and build AI-powered applications that solve real problems.
                        I believe great software isn't just about code — it's about creating
                        tools that genuinely improve people's workflows and experiences.
                    </p>
                    <p className="about-bio about-bio-2">
                        With a strong background in full-stack development and AI integration,
                        I bridge the gap between complex technology and intuitive user experiences.
                        From 3D web to intelligent voice agents — I build it all.
                    </p>
                    <div className="about-tags">
                        {['React', 'Next.js', 'Node.js', 'AI / ML', 'Three.js'].map(t => (
                            <span key={t} className="about-tag">{t}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
