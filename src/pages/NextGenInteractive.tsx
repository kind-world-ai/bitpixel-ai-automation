import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { NextGenAIScene } from '../components/next-gen-scene/NextGenAIScene';
import { Sparkles, Lightbulb, Zap, Cpu, Network, Eye, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Link } from 'react-router-dom';

// Mouse and scroll tracker
function SceneController({
  onUpdate,
}: {
  onUpdate: (mouse: THREE.Vector2, scroll: number) => void;
}) {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const scrollRef = useRef(0);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const handleScroll = useCallback(() => {
    scrollRef.current = window.scrollY / 1000;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  useFrame(() => {
    onUpdate(mouseRef.current, scrollRef.current);
  });

  return null;
}

const NextGenInteractive: React.FC = () => {
  const [mouse, setMouse] = useState(new THREE.Vector2(0, 0));
  const [scrollY, setScrollY] = useState(0);

  const handleUpdate = useCallback((newMouse: THREE.Vector2, newScroll: number) => {
    setMouse(newMouse.clone());
    setScrollY(newScroll);
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: 'Global Illumination',
      description: 'Natural light bounces, soft shadows, and realistic ambient occlusion - just like the real world.',
    },
    {
      icon: Cpu,
      title: 'AI Agents Network',
      description: 'Intelligent agents working together, visualized with natural lighting and smooth interactions.',
    },
    {
      icon: Network,
      title: 'Real-time Processing',
      description: 'Watch data flow between agents in real-time, rendered at 60fps with GPU acceleration.',
    },
    {
      icon: Eye,
      title: 'Interactive Experience',
      description: 'Move your mouse to create interactive light sources. Scroll to see depth and parallax effects.',
    },
  ];

  const technologies = [
    {
      name: 'Radiance Cascades',
      description: 'Multiple light bounces for natural illumination',
    },
    {
      name: 'Soft Shadows',
      description: 'Penumbra simulation for realistic shadows',
    },
    {
      name: 'Ambient Occlusion',
      description: 'Contact shadows and depth perception',
    },
    {
      name: 'Light Rays',
      description: 'Volumetric god rays from light sources',
    },
    {
      name: 'Interactive Lighting',
      description: 'Mouse-driven dynamic light sources',
    },
    {
      name: 'Natural Color Grading',
      description: 'Physically-based color and tone mapping',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero with Next-Gen Scene */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Scene Background */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 10 }}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
            }}
          >
            <color attach="background" args={['#000000']} />
            <NextGenAIScene mouse={mouse} scrollY={scrollY} />
            <SceneController onUpdate={handleUpdate} />
          </Canvas>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-10 h-10 text-cyan-400" />
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                The Next Era
              </h1>
            </div>

            <p className="text-2xl md:text-4xl font-light text-white/90 mb-8 leading-relaxed">
              Interactive Graphics with <br />
              <span className="font-semibold text-cyan-400">Natural Lighting</span> &{' '}
              <span className="font-semibold text-purple-400">AI Automation</span>
            </p>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              Combining global illumination, real-time AI agents, and interactive experiences.
              <br />
              This is the future of web graphics and automation visualization.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="group bg-cyan-500 hover:bg-cyan-600 text-white">
                <Link to="/contact">
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/shader-backgrounds">Explore More Demos</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="text-white/50 text-sm text-center mb-2">Move mouse • Scroll down</div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cyan-400 text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* What You're Seeing */}
      <section className="py-20 bg-gradient-to-b from-black via-slate-900 to-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              What You're <span className="text-cyan-400">Experiencing</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              This scene uses advanced rendering techniques to create natural, realistic lighting
              combined with AI agent visualization.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="p-3 bg-cyan-400/20 rounded-lg w-fit mb-4">
                    <feature.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-purple-400">Advanced</span> Graphics Technology
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Inspired by cutting-edge rendering techniques like Radiance Cascades and physically-based
              rendering.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                      <p className="text-sm text-white/60">{tech.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-20 bg-gradient-to-b from-black to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Why <span className="text-cyan-400">BitPixel</span> Does This
            </h2>
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <Card className="p-8 bg-white/5 border-white/10">
                <p className="text-lg text-white/90 leading-relaxed">
                  <span className="font-bold text-cyan-400">We believe in the future</span> where web
                  experiences are as beautiful and natural as the real world. Where AI agents are
                  visualized with proper lighting, depth, and interactivity.
                </p>
              </Card>

              <Card className="p-8 bg-white/5 border-white/10">
                <p className="text-lg text-white/90 leading-relaxed">
                  <span className="font-bold text-purple-400">This is automation made visible</span> -
                  showing how data flows, how AI agents collaborate, and how your business processes
                  transform into intelligent systems.
                </p>
              </Card>

              <Card className="p-8 bg-white/5 border-white/10">
                <p className="text-lg text-white/90 leading-relaxed">
                  <span className="font-bold text-green-400">The next era of interactive graphics</span>{' '}
                  isn't just about fancy effects - it's about creating meaningful, natural, and engaging
                  experiences that help users understand complex systems.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Build the <span className="text-cyan-400">Future</span>?
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Let's create beautiful, interactive experiences that showcase your AI agents and
              automation systems.
            </p>
            <Button asChild size="lg" className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
              <Link to="/contact">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Next-Gen Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NextGenInteractive;
