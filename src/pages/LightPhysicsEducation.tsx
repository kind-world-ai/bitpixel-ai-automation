import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { LightPrismScene } from '../components/light-physics/LightPrismScene';
import { Lightbulb, Waves, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Link } from 'react-router-dom';

// Mouse tracker
function SceneController({
  onUpdate,
}: {
  onUpdate: (mouse: THREE.Vector2) => void;
}) {
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  useFrame(() => {
    onUpdate(mouseRef.current);
  });

  return null;
}

const LightPhysicsEducation: React.FC = () => {
  const [mouse, setMouse] = useState(new THREE.Vector2(0, 0));
  const [showLabels, setShowLabels] = useState(true);

  const handleUpdate = useCallback((newMouse: THREE.Vector2) => {
    setMouse(newMouse.clone());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 overflow-x-hidden">
      {/* Hero with Light Prism Scene */}
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
            <color attach="background" args={['#f8fafc']} />
            <LightPrismScene mouse={mouse} showLabels={showLabels} />
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
              <Lightbulb className="w-10 h-10 text-amber-500" />
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-violet-600 via-blue-500 to-red-500 bg-clip-text text-transparent">
                The Physics of Light
              </h1>
            </div>

            <p className="text-2xl md:text-4xl font-light text-slate-700 mb-8 leading-relaxed">
              Understanding <span className="font-semibold text-violet-600">Wavelengths</span>,{' '}
              <span className="font-semibold text-blue-500">Dispersion</span>, and{' '}
              <span className="font-semibold text-red-500">Color</span>
            </p>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Watch as white light separates into a beautiful spectrum of colors through a prism.
              <br />
              This is the same physics that creates rainbows in the sky.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button
                onClick={() => setShowLabels(!showLabels)}
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                {showLabels ? 'Hide' : 'Show'} Labels
              </Button>
            </div>

            <p className="text-sm text-slate-500">Move your mouse to interact with the light</p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="text-slate-500 text-sm text-center mb-2">Learn more below</div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-violet-500 text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* What is Light? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
              What is <span className="text-amber-500">Light</span>?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Light is an electromagnetic wave that travels through space. Different wavelengths of
              light appear as different colors to our eyes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.6 }}
            >
              <Card className="p-8 bg-gradient-to-br from-violet-50 to-white border-violet-200 h-full">
                <div className="p-3 bg-violet-100 rounded-lg w-fit mb-4">
                  <Waves className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Wavelength</h3>
                <p className="text-slate-600 leading-relaxed">
                  Light travels as waves. The distance between wave peaks is called the wavelength,
                  measured in nanometers (nm). Visible light ranges from{' '}
                  <strong className="text-violet-600">380nm (violet)</strong> to{' '}
                  <strong className="text-red-600">780nm (red)</strong>.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-blue-200 h-full">
                <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">White Light</h3>
                <p className="text-slate-600 leading-relaxed">
                  White light (like sunlight) is not a single color - it's a mixture of all visible
                  wavelengths combined. When all colors blend together, they appear white to our
                  eyes.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="p-8 bg-gradient-to-br from-amber-50 to-white border-amber-200 h-full">
                <div className="p-3 bg-amber-100 rounded-lg w-fit mb-4">
                  <Eye className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Color Perception</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our eyes have special cells (cones) that detect different wavelengths. Our brain
                  interprets these signals as colors - short wavelengths as blue/violet, long
                  wavelengths as red.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Prisms Work */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
              How <span className="text-blue-500">Prisms</span> Create Rainbows
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              When light enters a prism, something magical happens - the different wavelengths bend
              by different amounts.
            </p>
          </motion.div>

          <div className="space-y-6">
            <Card className="p-8 bg-white border-slate-200">
              <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <span className="text-3xl">1️⃣</span>
                Refraction - Light Changes Direction
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                When light travels from air into glass (or water), it slows down and bends. This
                bending is called <strong>refraction</strong>. The amount of bending depends on the
                wavelength of the light.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-r from-violet-50 via-blue-50 to-red-50 border-slate-200">
              <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <span className="text-3xl">2️⃣</span>
                Dispersion - Different Colors Bend Differently
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                This is the key to understanding prisms:
              </p>
              <ul className="space-y-3 text-lg text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 font-bold">•</span>
                  <span>
                    <strong className="text-violet-600">Violet light (380nm)</strong> has the
                    shortest wavelength and bends the <strong>most</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong className="text-blue-500">Blue light (450nm)</strong> bends quite a bit
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>
                    <strong className="text-green-500">Green light (520nm)</strong> bends a medium
                    amount
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>
                    <strong className="text-yellow-500">Yellow light (580nm)</strong> bends less
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>
                    <strong className="text-red-500">Red light (700nm)</strong> has the longest
                    wavelength and bends the <strong>least</strong>
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-white border-slate-200">
              <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <span className="text-3xl">3️⃣</span>
                Separation - The Rainbow Appears
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Because each color bends by a different amount, the white light separates into a
                spectrum. The prism "unmixes" the colors that were blended together in white light,
                revealing the beautiful rainbow hidden inside.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The Visible Spectrum */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
              The <span className="bg-gradient-to-r from-violet-600 via-green-500 to-red-600 bg-clip-text text-transparent">Visible Spectrum</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The rainbow you see in the prism above shows the complete range of visible light.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-4">
            {[
              { color: 'Violet', range: '380-440nm', bg: 'from-violet-500 to-violet-600', text: 'text-white' },
              { color: 'Blue', range: '440-490nm', bg: 'from-blue-500 to-blue-600', text: 'text-white' },
              { color: 'Cyan', range: '490-520nm', bg: 'from-cyan-400 to-cyan-500', text: 'text-white' },
              { color: 'Green', range: '520-565nm', bg: 'from-green-500 to-green-600', text: 'text-white' },
              { color: 'Yellow', range: '565-590nm', bg: 'from-yellow-400 to-yellow-500', text: 'text-slate-900' },
              { color: 'Orange', range: '590-625nm', bg: 'from-orange-500 to-orange-600', text: 'text-white' },
              { color: 'Red', range: '625-780nm', bg: 'from-red-500 to-red-600', text: 'text-white' },
            ].map((spectrum, index) => (
              <motion.div
                key={spectrum.color}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Card className={`p-6 bg-gradient-to-br ${spectrum.bg} border-0 h-full`}>
                  <h3 className={`text-xl font-bold mb-2 ${spectrum.text}`}>{spectrum.color}</h3>
                  <p className={`text-sm ${spectrum.text} opacity-90`}>{spectrum.range}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real World Applications */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
              Where You See This <span className="text-blue-500">in Nature</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 bg-white border-slate-200">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">🌈 Rainbows</h3>
              <p className="text-slate-600 leading-relaxed">
                Rainbows form when sunlight enters water droplets in the air. Each droplet acts like
                a tiny prism, dispersing the light into colors. Millions of droplets create the arc
                you see in the sky.
              </p>
            </Card>

            <Card className="p-8 bg-white border-slate-200">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">💎 Diamonds</h3>
              <p className="text-slate-600 leading-relaxed">
                Diamonds sparkle with rainbow colors because they have a very high refractive index.
                Light entering a diamond bounces around inside and disperses into brilliant flashes
                of color.
              </p>
            </Card>

            <Card className="p-8 bg-white border-slate-200">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">💿 CDs and DVDs</h3>
              <p className="text-slate-600 leading-relaxed">
                The rainbow pattern on CDs happens through diffraction (a related phenomenon).
                Microscopic grooves split light into colors, similar to how a prism separates
                wavelengths.
              </p>
            </Card>

            <Card className="p-8 bg-white border-slate-200">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">🦋 Butterfly Wings</h3>
              <p className="text-slate-600 leading-relaxed">
                Some butterflies have wings with microscopic structures that act like prisms,
                creating iridescent colors that change as you view them from different angles.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
              Explore More <span className="text-violet-600">Interactive</span> Experiences
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Discover how BitPixel combines physics, graphics, and technology to create beautiful
              digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="group bg-violet-600 hover:bg-violet-700 text-white">
                <Link to="/next-gen">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Next-Gen AI Graphics
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Link to="/shader-backgrounds">More Shader Demos</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LightPhysicsEducation;
