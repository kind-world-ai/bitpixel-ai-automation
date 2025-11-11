import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Matter from 'matter-js';
import {
  Bot,
  Brain,
  Sparkles,
  Zap,
  ArrowRight,
  Code2,
  Globe,
  Cpu,
  Network,
  Layers,
  Activity,
  Workflow,
  Gauge,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// Carbon Optimized Three.js Scene - Minimal polygons, efficient rendering
const AnimatedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Efficient rotation animation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

// Particle network visualization with three.js
const ParticleNetwork: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100; // Reduced for carbon efficiency

  const particlesGeometry = React.useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Matter.js Physics Interactive Section
const PhysicsDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0.5, scale: 0.001 }
    });
    engineRef.current = engine;

    // Create renderer - carbon optimized with lower resolution
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: canvasRef.current.clientWidth,
        height: 400,
        wireframes: false,
        background: 'transparent',
        pixelRatio: 1 // Lower pixel ratio for efficiency
      }
    });
    renderRef.current = render;

    // Create AI-themed objects
    const colors = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'];
    const shapes: Matter.Body[] = [];

    // Create floating AI agent "nodes"
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * render.options.width!;
      const y = -50 - Math.random() * 200;
      const size = 30 + Math.random() * 30;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const circle = Bodies.circle(x, y, size, {
        restitution: 0.8,
        friction: 0.001,
        render: {
          fillStyle: color,
          strokeStyle: color,
          lineWidth: 2
        }
      });
      shapes.push(circle);
    }

    // Create boundaries
    const wallOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
    const ground = Bodies.rectangle(render.options.width! / 2, 400, render.options.width!, 20, wallOptions);
    const leftWall = Bodies.rectangle(0, 200, 20, 400, wallOptions);
    const rightWall = Bodies.rectangle(render.options.width!, 200, 20, 400, wallOptions);

    // Add all bodies to the world
    Composite.add(engine.world, [...shapes, ground, leftWall, rightWall]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-muted/20 border border-border">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
        <Activity className="w-3 h-3 inline mr-1" />
        Interactive Physics Simulation
      </div>
    </div>
  );
};

const AIAgentLanding: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const features = [
    {
      icon: Brain,
      title: "Intelligent AI Agents",
      description: "Self-learning agents that adapt to your business needs and evolve over time.",
      color: "text-purple-500"
    },
    {
      icon: Network,
      title: "Multi-Agent Systems",
      description: "Coordinated AI agents working together to solve complex problems.",
      color: "text-blue-500"
    },
    {
      icon: Workflow,
      title: "Automated Workflows",
      description: "Seamless integration with your existing tools and processes.",
      color: "text-green-500"
    },
    {
      icon: Cpu,
      title: "Advanced Processing",
      description: "High-performance computing for real-time decision making.",
      color: "text-orange-500"
    }
  ];

  const capabilities = [
    { label: "Natural Language Processing", value: 98 },
    { label: "Computer Vision", value: 95 },
    { label: "Decision Making", value: 92 },
    { label: "Process Automation", value: 97 }
  ];

  const vision = [
    {
      icon: Globe,
      title: "Digital-First Future",
      description: "Building the foundation for tomorrow's digital experiences with AI at the core."
    },
    {
      icon: Layers,
      title: "Seamless Integration",
      description: "Connecting physical and digital worlds through intelligent automation."
    },
    {
      icon: Sparkles,
      title: "Innovation Drive",
      description: "Pushing boundaries of what's possible with AI and machine learning."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Carbon Optimization Badge */}
      <div className="fixed top-20 right-4 z-50 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-full px-3 py-1 text-xs text-green-500 flex items-center gap-2">
        <Leaf className="w-3 h-3" />
        Carbon Optimized Design
      </div>

      {/* Hero Section with Three.js */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js Background - Carbon optimized */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{
              antialias: false, // Disable for performance
              powerPreference: "low-power" // Prefer efficiency
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <AnimatedSphere />
            <ParticleNetwork />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        {/* Content Overlay */}
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full text-sm font-medium text-foreground mb-8"
            >
              <Bot className="w-4 h-4 mr-2 text-primary" />
              Next-Generation AI Agent Platform
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                AI Agents
              </span>
              <br />
              <span className="text-foreground/90">
                That Think & Act
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Empowering businesses with intelligent AI agents that understand, learn, and evolve.
              Experience the future of digital automation and decision-making.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button asChild size="lg" className="group shadow-lg">
                <Link to="/contact">
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="backdrop-blur-sm bg-card/50">
                <Link to="/services">
                  Explore Capabilities
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-border/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-muted-foreground/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Vision</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transforming how businesses interact with technology through intelligent,
              autonomous AI agents and immersive digital experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {vision.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                  <div className="p-3 bg-primary rounded-xl w-fit mb-4">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Matter.js Physics Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary">Dynamic</span> AI Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Interact with our AI agent network. Each node represents an intelligent agent
              working in harmony. Drag and interact to see them respond.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <PhysicsDemo />
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary">Core</span> Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge AI technologies powering your business transformation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6 text-center h-full group hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Capabilities Progress Bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">AI Performance Metrics</h3>
              <div className="space-y-6">
                {capabilities.map((capability, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{capability.label}</span>
                      <span className="text-sm font-bold text-primary">{capability.value}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${capability.value}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-purple-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Digital Experience Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">Digital Experience</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Crafting <span className="text-primary">Immersive</span> Digital Worlds
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We don't just build AI agents – we create complete digital experiences
                that engage, delight, and transform how users interact with your business.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time 3D visualizations and interactions",
                  "Responsive design optimized for all devices",
                  "Seamless integration of AI and user experience",
                  "Carbon-efficient rendering and performance"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="p-1 bg-primary rounded-full mr-3 mt-0.5">
                      <Code2 className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="group">
                <Link to="/case-studies">
                  View Our Work
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Canvas
                    camera={{ position: [0, 0, 3], fov: 75 }}
                    gl={{
                      antialias: false,
                      powerPreference: "low-power"
                    }}
                  >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Sphere args={[1, 64, 64]} scale={1.5}>
                      <MeshDistortMaterial
                        color="#a78bfa"
                        attach="material"
                        distort={0.5}
                        speed={2}
                        roughness={0.2}
                      />
                    </Sphere>
                    <OrbitControls
                      enableZoom={false}
                      autoRotate
                      autoRotateSpeed={1}
                    />
                  </Canvas>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Gauge className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Performance</div>
                    <div className="text-xl font-bold">98% Optimized</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-pink-500/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Build the <span className="text-primary">Future</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join us in creating intelligent, efficient, and sustainable AI solutions
              that transform businesses and improve lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  <Bot className="w-5 h-5 mr-2" />
                  Start Your AI Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/automation-scorecard">
                  Get Automation Score
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AIAgentLanding;
