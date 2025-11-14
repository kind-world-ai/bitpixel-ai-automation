import React from 'react';
import { Link } from 'react-router-dom';
import { BitPixelScene } from './BitPixelScene';

export default function BitPixelHero() {
  return (
    <section className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-8 px-4 sm:px-8 py-16 bg-[#050711] relative overflow-hidden">
      {/* Ambient glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none" />

      {/* Left: Copy */}
      <div className="max-w-xl space-y-6 z-10 lg:flex-shrink-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
          From raw ideas to automated digital systems
        </h1>
        <p className="text-base md:text-lg text-white/70 leading-relaxed">
          BitPixel builds AI agents, automation workflows, and 3D-first experiences
          that turn your processes into scalable, intelligent systems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors text-center"
          >
            Book an Automation Audit
          </Link>
          <Link
            to="/case-studies"
            className="px-6 py-3 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-colors text-center"
          >
            View Case Studies
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-6 text-xs text-white/50 pt-4">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            AI Agents
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            Automation &amp; Workflows
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            ERP / CRM / Apps
          </span>
        </div>
      </div>

      {/* Right: 3D Canvas */}
      <div className="w-full lg:max-w-xl h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl z-10">
        <BitPixelScene />
      </div>
    </section>
  );
}
