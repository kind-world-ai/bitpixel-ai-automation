import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
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
  Wand2,
  Package,
  Layers,
  Zap as ZapIcon,
  Loader
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import AssemblyMachine3D from '../components/AssemblyMachine3D';

// Input sources that flow into the machine
const inputSources = [
  { icon: Mail, label: 'Gmail', color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' },
  { icon: Slack, label: 'Slack', color: 'text-purple-500', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30' },
  { icon: Zap, label: 'Zapier', color: 'text-orange-500', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30' },
  { icon: Database, label: 'CRM', color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
  { icon: FileText, label: 'Forms', color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' },
  { icon: Code, label: 'APIs', color: 'text-cyan-500', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/30' }
];

// Output cards that come out of the machine
const outputCards = [
  { title: 'Dashboard UI', desc: 'Responsive analytics panel', gradient: 'from-blue-500 to-purple-500', icon: LayoutDashboard },
  { title: 'Automation Flow', desc: 'Multi-step workflow', gradient: 'from-purple-500 to-pink-500', icon: Workflow },
  { title: 'Data Cards', desc: 'Modern card components', gradient: 'from-orange-500 to-red-500', icon: Layers }
];

// Service features
const serviceFeatures = [
  { title: 'AI-Powered Design', description: 'Intelligent component generation', icon: Wand2 },
  { title: 'Real-time Collaboration', description: 'Team sync and feedback loops', icon: Users },
  { title: 'Automated Testing', description: 'QA validation at every stage', icon: ShieldCheck },
  { title: 'Instant Deployment', description: 'Production-ready output', icon: ZapIcon }
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

  return (
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Hero Section - Mechanical Assembly Line */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Animated grid background - theme aware */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            >
              {i % 3 === 0 ? (
                <div className="w-8 h-8 border-2 border-primary/30 rounded-lg" />
              ) : i % 3 === 1 ? (
                <div className="w-6 h-6 bg-primary/20 rounded-full" />
              ) : (
                <div className="w-10 h-10 border-2 border-primary/20" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
              )}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <Badge className="mb-6 text-sm bg-primary/10 border-primary/20">
                <Package className="w-3 h-3 mr-1 inline" />
                Automation Design Assembly
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Watch Your Ideas Transform
              <br />
              <span className="text-primary">Into Production-Ready UI</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Experience the mechanical precision of our AI-powered assembly line turning automation sources into polished interfaces
            </motion.p>
          </motion.div>

          {/* 3D CNC Assembly Machine Visualization */}
          <motion.div
            className="relative max-w-7xl mx-auto mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <Suspense
              fallback={
                <div className="w-full h-[600px] rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center border border-border">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="inline-block mb-4"
                    >
                      <Loader className="w-12 h-12 text-primary" />
                    </motion.div>
                    <p className="text-muted-foreground">Loading 3D Assembly Machine...</p>
                  </div>
                </div>
              }
            >
              <AssemblyMachine3D />
            </Suspense>

            {/* 3D Scene Description */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-muted-foreground mb-2">
                <Sparkles className="w-4 h-4 inline mr-2 text-primary" />
                Interactive 3D CNC Assembly Line
              </p>
              <p className="text-xs text-muted-foreground">
                Drag to rotate • Scroll to zoom • Watch raw inputs transform into polished UI cards
              </p>
            </motion.div>
          </motion.div>

          {/* Input/Output Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Input Sources */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                    Integration Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {inputSources.map((source, idx) => {
                      const Icon = source.icon;
                      return (
                        <motion.div
                          key={idx}
                          className={`p-4 rounded-lg border transition-all ${source.bgColor} ${source.borderColor} hover:scale-105 cursor-pointer`}
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className={`w-6 h-6 ${source.color} mx-auto mb-2`} />
                          <div className="text-xs text-center font-medium text-foreground">{source.label}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Output Products */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Production Outputs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {outputCards.map((card, idx) => {
                      const CardIcon = card.icon;
                      return (
                        <motion.div
                          key={idx}
                          className="bg-background border border-border rounded-lg p-3 hover:border-primary/50 transition-all cursor-pointer"
                          whileHover={{ x: 5 }}
                        >
                          <div className={`h-1 w-full rounded-full bg-gradient-to-r ${card.gradient} mb-2`} />
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient} bg-opacity-10`}>
                              <CardIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-foreground text-sm">{card.title}</div>
                              <div className="text-xs text-muted-foreground">{card.desc}</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Service Features Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-4 gap-4 mb-12"
          >
            {serviceFeatures.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1, type: "spring" }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FeatureIcon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button size="lg" className="gap-2 group">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Start the Assembly
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
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
