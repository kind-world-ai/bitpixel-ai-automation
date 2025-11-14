import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BitPixelHero from '../components/hero/BitPixelHero';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowRight, Zap, Code2, Workflow, Database } from 'lucide-react';

const BitPixelGICascade: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Automation',
      description: 'Intelligent agents that learn from your processes and continuously optimize workflows.',
      color: 'text-blue-400',
    },
    {
      icon: Code2,
      title: '3D-First Experiences',
      description: 'Cutting-edge WebGL and Three.js implementations for immersive digital products.',
      color: 'text-purple-400',
    },
    {
      icon: Workflow,
      title: 'Seamless Integration',
      description: 'Connect all your tools and data sources into unified, automated workflows.',
      color: 'text-cyan-400',
    },
    {
      icon: Database,
      title: 'Enterprise Solutions',
      description: 'Scalable ERP, CRM, and custom applications built for growth.',
      color: 'text-pink-400',
    },
  ];

  const stats = [
    { value: '500+', label: 'Automation Workflows' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '10x', label: 'Efficiency Gain' },
    { value: '24/7', label: 'AI Agent Uptime' },
  ];

  const useCases = [
    {
      title: 'AI Customer Support',
      description: 'Deploy intelligent chatbots that handle inquiries, learn from interactions, and escalate when needed.',
      tags: ['NLP', 'Machine Learning', 'Integration'],
    },
    {
      title: 'Process Automation',
      description: 'Transform manual workflows into automated pipelines that run 24/7 without human intervention.',
      tags: ['n8n', 'Zapier', 'Custom APIs'],
    },
    {
      title: 'Data Intelligence',
      description: 'Real-time dashboards and AI-powered analytics that turn your data into actionable insights.',
      tags: ['Analytics', 'Visualization', 'Reporting'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050711] via-[#0a0e1a] to-background">
      {/* Hero Section with 3D Scene */}
      <BitPixelHero />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Transform Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Business</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We engineer intelligent systems that automate, optimize, and scale your operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="p-6 h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-white/10 to-transparent mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-b from-background to-[#0a0e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Real-World <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Applications</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              See how BitPixel's AI and automation solutions solve complex business challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="p-8 h-full bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-white">{useCase.title}</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Ready to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Automate</span>?
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how BitPixel can transform your business with AI agents,
              automation workflows, and cutting-edge digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="group bg-white text-black hover:bg-white/90">
                <Link to="/contact">
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Book Your Audit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/case-studies">
                  View Case Studies
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BitPixelGICascade;
