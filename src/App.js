import React, { useState, useEffect } from 'react';
import './index.css';

import useMomentumScroll from './hooks/useMomentumScroll';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import KnowledgeDashboard from './components/KnowledgeDashboard';
import SkillsGrid from './components/SkillsGrid';
import SelectedWork from './components/SelectedWork';
import Hackathons from './components/Hackathons';
import Certificates from './components/Certificates';
import ResearchPaper from './components/ResearchPaper';
import GithubProfile from './components/GithubProfile';
import Marquee from './components/Marquee';
import Services from './components/Services';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WanderingCreature from './components/WanderingCreature';
import ChatWidget from './components/ChatWidget';

function App() {
  const [loaded, setLoaded] = useState(false);
  useMomentumScroll();

  // Global Scroll Animations Observer
  useEffect(() => {
    if (!loaded) return;

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.section-label, .kd-title, .skills-title, .works-title, .h-title, .c-title, .rp-title, .services-title, .cta-heading');

    animateElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loaded]);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />

      <div
        className="app-container"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease' }}
      >
        <div className="noise" aria-hidden="true" />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Stats />
          <KnowledgeDashboard />
          <SkillsGrid />
          <SelectedWork />
          <Hackathons />
          <Certificates />
          <GithubProfile />
          <ResearchPaper />
          <Marquee />
          <Services />
          <CTA />
        </main>
        <Footer />
        <WanderingCreature />
        <ChatWidget />
      </div>
    </>
  );
}

export default App;
