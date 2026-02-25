import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RollingHeading from './RollingHeading';
import './GithubProfile.css';

export default function GithubProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const userResponse = await fetch('https://api.github.com/users/Aquibyounis');
                const userData = await userResponse.json();

                setUserData({
                    avatar: userData.avatar_url,
                    name: userData.name || 'Aquib Younis',
                    login: userData.login,
                    bio: userData.bio,
                    repos: userData.public_repos,
                    followers: userData.followers,
                    following: userData.following,
                });
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    if (loading) return <div className="gh-loading">Loading contributions...</div>;

    return (
        <section className="gh-section">
            <div className="gh-content">
                <motion.div
                    className="gh-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="section-label">/CONTRIBUTIONS</span>
                    <RollingHeading text="GitHub Ecosystem." className="gh-title" />
                </motion.div>

                <div className="gh-grid">
                    <motion.div
                        className="gh-card profile-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="gh-user">
                            <img src={userData?.avatar} alt={userData?.name} className="gh-avatar" />
                            <div className="gh-user-info">
                                <h3>{userData?.name}</h3>
                                <p>@{userData?.login}</p>
                            </div>
                        </div>
                        <p className="gh-bio">{userData?.bio || 'Creating autonomous agents and full-stack solutions.'}</p>
                        <div className="gh-stats-row">
                            <div className="gh-stat">
                                <span className="gh-stat-val">{userData?.repos}</span>
                                <span className="gh-stat-lab">Repos</span>
                            </div>
                            <div className="gh-stat">
                                <span className="gh-stat-val">{userData?.followers}</span>
                                <span className="gh-stat-lab">Followers</span>
                            </div>
                            <div className="gh-stat">
                                <span className="gh-stat-val">{userData?.following}</span>
                                <span className="gh-stat-lab">Following</span>
                            </div>
                        </div>
                        <a href={`https://github.com/${userData?.login}`} target="_blank" rel="noreferrer" className="btn-outline gh-btn">
                            FOLLOW ON GITHUB
                        </a>
                    </motion.div>

                    <motion.div
                        className="gh-card activity-card"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <p className="gh-card-label">LATEST ACTIVITY</p>
                        <div className="gh-activity-list">
                            <div className="gh-activity-item">
                                <div className="gh-activity-dot" />
                                <div className="gh-activity-text">
                                    <p>Open Source Contributions & AI Research</p>
                                    <span>Building the next generation of agentic AI solutions.</span>
                                </div>
                            </div>
                        </div>
                        <div className="gh-graph-preview">
                            <div className="gh-graph-box">
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div key={i} className="gh-graph-dot" style={{ opacity: Math.random() * 0.8 + 0.2 }} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
