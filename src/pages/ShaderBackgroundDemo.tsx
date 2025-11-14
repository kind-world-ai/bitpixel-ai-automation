import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BitPixelShaderBackground, ShaderType } from '../components/shader-backgrounds/BitPixelShaderBackground';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Code2, Cpu, Waves, Sparkles, MousePointer2, ScrollText } from 'lucide-react';

const ShaderBackgroundDemo: React.FC = () => {
  const [selectedShader, setSelectedShader] = useState<ShaderType>('dataflow');
  const [mouseTracking, setMouseTracking] = useState(true);
  const [scrollTracking, setScrollTracking] = useState(true);

  const shaders: { type: ShaderType; name: string; description: string; icon: typeof Code2; features: string[] }[] = [
    {
      type: 'dataflow',
      name: 'Digital Data Flow',
      description: 'Subtle data streams with minimal neural network visualization',
      icon: Cpu,
      features: [
        'Sparse flowing data streams',
        'Minimal 4-node neural network',
        'Subtle background grid',
        'Floating particles',
        'Gentle mouse interaction',
        'Natural, non-bright lighting',
      ],
    },
    {
      type: 'binaryrain',
      name: 'Binary Rain',
      description: 'Matrix-style falling binary and hex code with BitPixel aesthetics',
      icon: Code2,
      features: [
        'Falling binary (0/1) characters',
        'Hex digit streams',
        'Trailing glow effects',
        'Floating bit particles',
        'Mouse disruption field',
        'Scanline overlays',
      ],
    },
    {
      type: 'automationflow',
      name: 'Automation Pipeline',
      description: 'Visualizes data processing through automation stages - meaningful workflow representation',
      icon: Waves,
      features: [
        'Input → Processing → Output flow',
        'Three processing stages with progress indicators',
        'Animated data particles along paths',
        'Success/completion visualization',
        'Real automation pipeline metaphor',
        'Shows BitPixel core business value',
      ],
    },
  ];

  const currentShader = shaders.find((s) => s.type === selectedShader);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Shader Background */}
      <BitPixelShaderBackground
        shaderType={selectedShader}
        enableMouseTracking={mouseTracking}
        enableScrollTracking={scrollTracking}
        opacity={1}
        zIndex={0}
      />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              BitPixel Shader Backgrounds
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Custom GLSL shaders designed for <span className="font-bold text-cyan-400">Bit</span>
            <span className="font-bold text-purple-400">Pixel</span> Coders.
            <br />
            Interactive, beautiful, and optimized for the future of digital experiences.
          </p>
        </motion.div>

        {/* Shader Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {shaders.map((shader, index) => (
              <motion.div
                key={shader.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 ${
                    selectedShader === shader.type
                      ? 'bg-white/20 border-cyan-400 border-2 shadow-lg shadow-cyan-400/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setSelectedShader(shader.type)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <shader.icon
                      className={`w-6 h-6 ${
                        selectedShader === shader.type ? 'text-cyan-400' : 'text-white/70'
                      }`}
                    />
                    <h3
                      className={`text-xl font-bold ${
                        selectedShader === shader.type ? 'text-white' : 'text-white/80'
                      }`}
                    >
                      {shader.name}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 mb-4">{shader.description}</p>

                  {selectedShader === shader.type && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-white/20 pt-4 mt-4">
                        <p className="text-xs text-white/50 mb-2 font-semibold">Features:</p>
                        <ul className="space-y-1">
                          {shader.features.map((feature, i) => (
                            <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Interactive Controls</h3>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setMouseTracking(!mouseTracking)}
                variant={mouseTracking ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${
                  mouseTracking
                    ? 'bg-cyan-500 hover:bg-cyan-600'
                    : 'border-white/20 text-white/70 hover:bg-white/10'
                }`}
              >
                <MousePointer2 className="w-4 h-4" />
                Mouse Tracking: {mouseTracking ? 'ON' : 'OFF'}
              </Button>

              <Button
                onClick={() => setScrollTracking(!scrollTracking)}
                variant={scrollTracking ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${
                  scrollTracking
                    ? 'bg-purple-500 hover:bg-purple-600'
                    : 'border-white/20 text-white/70 hover:bg-white/10'
                }`}
              >
                <ScrollText className="w-4 h-4" />
                Scroll Tracking: {scrollTracking ? 'ON' : 'OFF'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Current Shader Info */}
        {currentShader && (
          <motion.div
            key={selectedShader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
          >
            <Card className="p-8 bg-black/40 backdrop-blur-md border-cyan-400/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-cyan-400/20 rounded-lg">
                  <currentShader.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {currentShader.name}
                  </h2>
                  <p className="text-white/70">{currentShader.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white/50 mb-2">
                    Perfect For:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedShader === 'dataflow' && (
                      <>
                        <span className="px-3 py-1 text-xs rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                          AI/ML Websites
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-400/20 text-blue-300 border border-blue-400/30">
                          Tech Startups
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30">
                          Data Analytics
                        </span>
                      </>
                    )}
                    {selectedShader === 'binaryrain' && (
                      <>
                        <span className="px-3 py-1 text-xs rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                          Developer Tools
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-green-400/20 text-green-300 border border-green-400/30">
                          Cybersecurity
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30">
                          Code Platforms
                        </span>
                      </>
                    )}
                    {selectedShader === 'automationflow' && (
                      <>
                        <span className="px-3 py-1 text-xs rounded-full bg-green-400/20 text-green-300 border border-green-400/30">
                          Automation Services
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                          AI Agents
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-400/20 text-blue-300 border border-blue-400/30">
                          Workflow Platforms
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-sm font-semibold text-white/50 mb-2">
                    Usage:
                  </h4>
                  <pre className="bg-black/40 p-4 rounded-lg text-xs text-cyan-400 overflow-x-auto border border-white/10">
                    {`<BitPixelShaderBackground
  shaderType="${selectedShader}"
  enableMouseTracking={true}
  enableScrollTracking={true}
  opacity={1}
  zIndex={-1}
/>`}
                  </pre>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center pb-20"
        >
          <p className="text-white/50 text-sm mb-2">
            {mouseTracking && 'Move your mouse • '}
            {scrollTracking && 'Scroll down • '}
            Interact with the background
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block text-cyan-400"
          >
            ↓
          </motion.div>
        </motion.div>

        {/* Spacer for scroll testing */}
        {scrollTracking && (
          <div className="h-screen flex items-center justify-center">
            <Card className="p-12 bg-black/60 backdrop-blur-md border-white/20 max-w-2xl mx-4">
              <h3 className="text-3xl font-bold text-white mb-4 text-center">
                Keep Scrolling
              </h3>
              <p className="text-white/70 text-center">
                Notice how the shader responds to your scroll position,
                creating a dynamic and engaging experience.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShaderBackgroundDemo;
