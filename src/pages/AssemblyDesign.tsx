import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Workflow,
  Mail,
  Building2,
  LayoutDashboard,
  Sparkles,
  Cpu,
  Palette,
  ArrowRight,
  Gauge,
  ShieldCheck,
  Users,
  Slack,
  Zap,
  Database,
  FileText,
  Code,
  Wand2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

// Input sources that flow into the machine
const inputSources = [
  { icon: Mail, label: 'Gmail', color: 'text-red-500' },
  { icon: Slack, label: 'Slack', color: 'text-purple-500' },
  { icon: Zap, label: 'Zapier', color: 'text-orange-500' },
  { icon: Database, label: 'CRM', color: 'text-blue-500' },
  { icon: FileText, label: 'Forms', color: 'text-green-500' },
  { icon: Code, label: 'APIs', color: 'text-cyan-500' }
];

// Output cards that come out of the machine
const outputCards = [
  { title: 'Dashboard UI', desc: 'Responsive analytics panel', gradient: 'from-blue-500 to-purple-500' },
  { title: 'Automation Flow', desc: 'Multi-step workflow', gradient: 'from-purple-500 to-pink-500' },
  { title: 'Data Cards', desc: 'Modern card components', gradient: 'from-orange-500 to-red-500' }
];

const flowStages = [
  {
    icon: Lightbulb,
    title: 'Raw Ideas',
    description:
      'Capture product requirements, user stories, and business goals in a single intake hub ready for transformation.'
  },
  {
    icon: Workflow,
    title: 'Automation Orchestration',
    description:
      'Route intelligence through Gmail, CRM, ERP, and knowledge bases to enrich data and trigger downstream actions.'
  },
  {
    icon: LayoutDashboard,
    title: 'Assembly Blueprint',
    description:
      'Generate interaction models, UI states, and component specs with automated QA gates before design begins.'
  },
  {
    icon: Palette,
    title: 'Pixel-Perfect Output',
    description:
      'Deliver responsive experiences optimized for every device with design tokens synced to your design system.'
  }
];

const capabilityColumns = [
  {
    title: 'Automation Inputs',
    icon: Mail,
    color: 'from-blue-500/20 to-purple-500/20',
    highlights: [
      'Idea ingestion from email, CRM, ERP, and form submissions',
      'Entity resolution and enrichment with AI copilots',
      'Priority scoring and capacity-aware routing'
    ]
  },
  {
    title: 'Intelligent Fabric',
    icon: Cpu,
    color: 'from-amber-500/20 to-pink-500/20',
    highlights: [
      'Composable workflow engine with human-in-the-loop checkpoints',
      'Design system sync with Figma, Storybook, and component libraries',
      'Realtime observability dashboard for every automation cell'
    ]
  },
  {
    title: 'UI Assembly Line',
    icon: Sparkles,
    color: 'from-emerald-500/20 to-cyan-500/20',
    highlights: [
      'Responsive layouts auto-tested across breakpoints',
      'Accessibility scoring and remediation playbooks',
      'Automated handoff to engineering with production-ready tokens'
    ]
  }
];

const timeline = [
  {
    title: 'Blueprint Discovery',
    description:
      'Map current tooling, integrations, and required experiences while identifying reusable interface modules.',
    metric: 'Week 1'
  },
  {
    title: 'Automation Fabric Setup',
    description:
      'Connect Gmail, CRM, ERP, and data sources into orchestrated workflows with validation harnesses.',
    metric: 'Week 2-3'
  },
  {
    title: 'Assembly UI Production',
    description:
      'Generate modular UI flows, conduct responsive QA, and iterate with your stakeholders in real time.',
    metric: 'Week 4-5'
  },
  {
    title: 'Launch & Optimization',
    description:
      'Deploy automation monitors, feedback loops, and experience analytics to continuously improve the system.',
    metric: 'Week 6+'
  }
];

const AssemblyDesign: React.FC = () => {
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [currentOutputIndex, setCurrentOutputIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const inputInterval = setInterval(() => {
      setCurrentInputIndex((prev) => (prev + 1) % inputSources.length);
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 1000);
    }, 2500);

    const outputInterval = setInterval(() => {
      setCurrentOutputIndex((prev) => (prev + 1) % outputCards.length);
    }, 2500);

    return () => {
      clearInterval(inputInterval);
      clearInterval(outputInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Hero Section - Transformation Machine */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)]" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
              }}
              animate={{
                y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="mb-6 text-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              Automation Design Assembly
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Turn raw inputs into polished interfaces
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10">
              Watch as your automation tools transform into production-ready UI components through our intelligent assembly line
            </p>
          </motion.div>

          {/* Transformation Machine Visualization */}
          <div className="relative max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center">

              {/* INPUT SIDE */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-end space-y-4"
              >
                <div className="text-right mb-4">
                  <h3 className="text-lg font-semibold text-white mb-1">Raw Inputs</h3>
                  <p className="text-sm text-slate-400">Automation sources</p>
                </div>

                <div className="relative w-full max-w-xs">
                  <AnimatePresence mode="wait">
                    {inputSources.map((source, idx) => {
                      if (idx !== currentInputIndex) return null;
                      const Icon = source.icon;
                      return (
                        <motion.div
                          key={source.label}
                          initial={{ opacity: 0, scale: 0.8, x: -20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: 20 }}
                          transition={{ duration: 0.5 }}
                          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-2xl"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg bg-slate-900/50 ${source.color}`}>
                              <Icon className="w-8 h-8" />
                            </div>
                            <div>
                              <div className="text-white font-semibold">{source.label}</div>
                              <div className="text-xs text-slate-400">Integration source</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Animated connection line */}
                  <motion.div
                    className="absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Input icon grid preview */}
                <div className="grid grid-cols-3 gap-2 mt-6">
                  {inputSources.map((source, idx) => {
                    const Icon = source.icon;
                    return (
                      <motion.div
                        key={idx}
                        className={`p-2 rounded-lg border transition-all ${
                          idx === currentInputIndex
                            ? 'border-blue-500/50 bg-blue-500/10'
                            : 'border-slate-700/30 bg-slate-800/20'
                        }`}
                        animate={{
                          scale: idx === currentInputIndex ? 1.05 : 1,
                        }}
                      >
                        <Icon className={`w-4 h-4 ${source.color}`} />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* MACHINE / PROCESSOR */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"
                    animate={{
                      scale: isProcessing ? [1, 1.2, 1] : 1,
                      opacity: isProcessing ? [0.5, 1, 0.5] : 0.3,
                    }}
                    transition={{ duration: 1 }}
                  />

                  {/* Main machine box */}
                  <motion.div
                    className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden"
                    animate={{
                      boxShadow: isProcessing
                        ? ['0 0 20px rgba(59, 130, 246, 0.3)', '0 0 40px rgba(147, 51, 234, 0.5)', '0 0 20px rgba(59, 130, 246, 0.3)']
                        : '0 0 20px rgba(59, 130, 246, 0.2)',
                    }}
                    transition={{ duration: 1 }}
                  >
                    {/* Scan lines effect */}
                    <AnimatePresence>
                      {isProcessing && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
                          initial={{ y: '-100%' }}
                          animate={{ y: '100%' }}
                          exit={{ y: '100%' }}
                          transition={{ duration: 1, ease: "linear" }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Machine icon */}
                    <motion.div
                      animate={{
                        rotate: isProcessing ? 360 : 0,
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <Wand2 className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
                    </motion.div>

                    {/* Corner indicators */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 bg-blue-500 rounded-full ${
                          i === 0 ? 'top-2 left-2' :
                          i === 1 ? 'top-2 right-2' :
                          i === 2 ? 'bottom-2 left-2' :
                          'bottom-2 right-2'
                        }`}
                        animate={{
                          opacity: isProcessing ? [0.3, 1, 0.3] : 0.5,
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Label */}
                <div className="text-center mt-4">
                  <div className="text-sm font-semibold text-white">AI Assembly</div>
                  <div className="text-xs text-slate-400">Processing...</div>
                </div>
              </motion.div>

              {/* OUTPUT SIDE */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-start space-y-4"
              >
                <div className="text-left mb-4">
                  <h3 className="text-lg font-semibold text-white mb-1">Polished Output</h3>
                  <p className="text-sm text-slate-400">Production-ready UI</p>
                </div>

                <div className="relative w-full max-w-xs">
                  {/* Animated connection line */}
                  <motion.div
                    className="absolute top-1/2 -left-8 w-8 h-0.5 bg-gradient-to-l from-purple-500 to-transparent"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  <AnimatePresence mode="wait">
                    {outputCards.map((card, idx) => {
                      if (idx !== currentOutputIndex) return null;
                      return (
                        <motion.div
                          key={card.title}
                          initial={{ opacity: 0, scale: 0.8, x: 20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: -20 }}
                          transition={{ duration: 0.5 }}
                          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-2xl overflow-hidden"
                        >
                          <div className={`h-2 w-full rounded-full bg-gradient-to-r ${card.gradient} mb-4`} />
                          <div>
                            <div className="text-white font-semibold mb-2">{card.title}</div>
                            <div className="text-sm text-slate-400 mb-4">{card.desc}</div>
                            <div className="flex gap-2">
                              <div className="w-full h-2 bg-slate-700 rounded" />
                              <div className="w-3/4 h-2 bg-slate-700 rounded" />
                            </div>
                            <div className="flex gap-2 mt-2">
                              <div className="w-1/2 h-2 bg-slate-700 rounded" />
                              <div className="w-full h-2 bg-slate-700 rounded" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Output preview badges */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {outputCards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${
                        idx === currentOutputIndex
                          ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                          : 'border-slate-700/30 bg-slate-800/20 text-slate-400'
                      }`}
                      animate={{
                        scale: idx === currentOutputIndex ? 1.05 : 1,
                      }}
                    >
                      {card.title}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Sparkles className="w-4 h-4" />
              Start the Assembly
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-slate-700 hover:bg-slate-800">
              <Users className="w-4 h-4" />
              Book a Workshop
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {flowStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  <Card className="h-full border-border/60 shadow-lg">
                    <CardHeader className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-full bg-gradient-to-br from-primary/15 to-secondary/15">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <Badge variant="outline">Stage {index + 1}</Badge>
                      </div>
                      <CardTitle className="text-xl">{stage.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {stage.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < flowStages.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground/60" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4" variant="secondary">
              Integrated Fabric
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Every cell in the assembly line is automated, observable, and human-friendly
            </h2>
            <p className="text-lg text-muted-foreground">
              Blend automation intelligence with intentional design to deliver experiences that are resilient, consistent,
              and ready to deploy across platforms.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {capabilityColumns.map((column, index) => {
              const Icon = column.icon;
              return (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${column.color}`} />
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle>{column.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4 text-sm text-muted-foreground">
                        {column.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <div className="w-1.5 rounded-full bg-primary/70 mt-1.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div>
                <Badge className="mb-3" variant="outline">
                  Execution Timeline
                </Badge>
                <h2 className="text-3xl font-semibold mb-4">From blueprint to launch in six weeks</h2>
                <p className="text-muted-foreground">
                  Our assembly methodology compresses delivery timelines by orchestrating automation, design systems, and
                  governance from day zero.
                </p>
              </div>
              <div className="space-y-6">
                {timeline.map((item) => (
                  <Card key={item.title} className="border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="secondary">{item.metric}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-primary/20 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Gauge className="w-6 h-6 text-primary" />
                    <CardTitle>Quality as a Service</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground text-sm">
                  <p>
                    Every stage of the assembly pipeline includes automated QA, accessibility validation, and governance checks
                    so your team can ship faster with confidence.
                  </p>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <span>Compliance-ready templates and audit trails</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span>Design token sync with automated variance detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <LayoutDashboard className="w-5 h-5 text-primary" />
                      <span>Real-time control tower for automation health</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge className="mb-2" variant="secondary">
              Ready to assemble
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Let’s build an automation-first experience factory for your product
            </h2>
            <p className="text-lg text-muted-foreground">
              Partner with BitPixel Coders to architect the workflows, UI systems, and governance that turn ideas into high-
              fidelity customer experiences—on repeat.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Start the Assembly
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Building2 className="w-5 h-5" />
                See Manufacturing Playbooks
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AssemblyDesign;
