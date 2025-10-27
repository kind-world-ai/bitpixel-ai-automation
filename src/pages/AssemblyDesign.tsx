import React from 'react';
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
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Badge className="mb-6 text-sm">Automation Design Assembly</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Turn raw ideas into production-ready interfaces
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              We architect a manufacturing-inspired assembly line for digital products—where ideas enter, automation tools
              refine, and beautiful, responsive UI rolls off the line ready for customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <ArrowRight className="w-4 h-4" />
                Explore the Assembly
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Users className="w-4 h-4" />
                Book a Workshop
              </Button>
            </div>
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
