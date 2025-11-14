import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';
import About from './pages/About';
import Blog from './pages/Blog';
import AutomationScorecard from './pages/AutomationScorecard';
import AssemblyDesign from './pages/AssemblyDesign';
import AIAgentLanding from './pages/AIAgentLanding';
import BitPixelGICascade from './pages/BitPixelGICascade';
import ParticleGridExperience from './pages/ParticleGridExperience';
import ThemeDemo from './components/ThemeDemo';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Immersive full-screen experience - outside Layout */}
        <Route path="particle-grid" element={<ParticleGridExperience />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="automation-scorecard" element={<AutomationScorecard />} />
          <Route path="assembly-design" element={<AssemblyDesign />} />
          <Route path="ai-agent-landing" element={<AIAgentLanding />} />
          <Route path="bitpixel-gi-cascade" element={<BitPixelGICascade />} />
          <Route path="theme-demo" element={<ThemeDemo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
