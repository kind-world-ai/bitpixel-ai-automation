import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Workflow, 
  TrendingUp, 
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Star,
  BarChart3,
  Target,
  Lightbulb,
  Rocket,
  ChevronRight,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import HeroBackground from '../components/HeroBackground';

const Home: React.FC = () => {
  const stats = [
    { icon: TrendingUp, label: "Average ROI", value: "340%" },
    { icon: Clock, label: "Hours Saved", value: "45k+" },
    { icon: Users, label: "Happy Clients", value: "50+" },
    { icon: Star, label: "Success Rate", value: "98%" }
  ];

  const services = [
    {
      icon: Bot,
      title: "LLM Agent Development",
      description: "Custom AI agents powered by Claude, ChatGPT, and open-source models that work 24/7 to automate your business processes.",
      features: ["Conversational AI interfaces", "Multi-agent systems", "Custom knowledge bases", "API integrations"]
    },
    {
      icon: Workflow,
      title: "No-Code Automation",
      description: "Advanced n8n workflows, Make.com integrations, and Zapier solutions that connect your tools without writing code.",
      features: ["Visual workflow builder", "300+ app integrations", "Conditional logic", "Real-time monitoring"]
    },
    {
      icon: Zap,
      title: "Python Automation",
      description: "Robust automation pipelines, data processing, and API integrations built with modern Python frameworks.",
      features: ["Custom script development", "Data processing pipelines", "Web scraping solutions", "Task scheduling"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        {/* Content overlay for better text readability */}
        <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Company Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full text-sm font-medium text-foreground mb-8"
            >
              <Rocket className="w-4 h-4 mr-2 text-primary" />
              BitPixel Coders - AI Automation Experts
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Automate Your Business
              </span>
              <br />
              <span className="text-foreground/90">
                With AI Agents
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Transform your business with intelligent automation solutions. We build AI agents, 
              no-code workflows, and custom automation that work 24/7 so you can focus on growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Button asChild size="lg" className="group shadow-lg">
                <Link to="/automation-scorecard">
                  <Target className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Get Free Automation Score
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="backdrop-blur-sm bg-card/50">
                <Link to="/contact">
                  Schedule Free Consultation
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold mb-1 text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-border/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-muted-foreground/70 rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Automation Capabilities Tabs Section */}
      <section className="py-20 relative bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Automation Superpowers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our AI-powered solutions transform different aspects of your business operations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="ai-agents" className="w-full max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-md border border-border">
                <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
                <TabsTrigger value="workflows">Workflows</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="integration">Integration</TabsTrigger>
              </TabsList>

              <TabsContent value="ai-agents" className="mt-8">
                <Card className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary rounded-xl mr-4">
                          <Bot className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-3xl font-bold">Intelligent AI Agents</h3>
                      </div>
                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        Deploy sophisticated AI agents that understand context, learn from interactions, and make intelligent decisions 24/7. 
                        Powered by Claude, ChatGPT, and custom LLMs tailored to your business.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Customer Service</span>
                          <Progress value={95} className="w-32" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Lead Qualification</span>
                          <Progress value={88} className="w-32" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Content Generation</span>
                          <Progress value={92} className="w-32" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4 border">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm text-muted-foreground">Active Agent: Customer Support</span>
                        </div>
                        <p className="text-foreground text-sm">"I've successfully resolved 47 customer queries today with 98% satisfaction rate."</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 border">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-primary rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm text-muted-foreground">Active Agent: Lead Qualifier</span>
                        </div>
                        <p className="text-foreground text-sm">"Analyzed 23 leads, qualified 8 high-value prospects for your sales team."</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="workflows" className="mt-8">
                <Card className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary rounded-xl mr-4">
                          <Workflow className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-3xl font-bold">No-Code Workflows</h3>
                      </div>
                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        Visual workflow automation using n8n, Make.com, and Zapier. Connect 300+ apps 
                        without writing code. Smart triggers, conditional logic, and error handling included.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">n8n</Badge>
                        <Badge variant="secondary">Make.com</Badge>
                        <Badge variant="secondary">Zapier</Badge>
                        <Badge variant="secondary">Airtable</Badge>
                        <Badge variant="secondary">Slack</Badge>
                        <Badge variant="secondary">+295 more</Badge>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">2,847</div>
                        <div className="text-muted-foreground">Active Workflows</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-primary">99.8%</div>
                          <div className="text-xs text-muted-foreground">Uptime</div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-green-500">5.2s</div>
                          <div className="text-xs text-muted-foreground">Avg Speed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-8">
                <Card className="p-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 bg-primary rounded-xl mr-4">
                        <BarChart3 className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-3xl font-bold">Real-Time Analytics</h3>
                    </div>
                    <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                      Advanced analytics dashboard with AI-powered insights, predictive modeling, and automated reporting.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">340%</div>
                        <div className="text-muted-foreground text-sm">ROI Increase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">45k+</div>
                        <div className="text-muted-foreground text-sm">Hours Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-500 mb-2">98%</div>
                        <div className="text-muted-foreground text-sm">Accuracy Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
                        <div className="text-muted-foreground text-sm">Monitoring</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="integration" className="mt-8">
                <Card className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary rounded-xl mr-4">
                          <Zap className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-3xl font-bold">Seamless Integration</h3>
                      </div>
                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        Connect your existing tools and systems with our automation platform. 
                        API-first architecture ensures compatibility with any software.
                      </p>
                      <Button variant="default" className="group">
                        View Integration Guide
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {['CRM', 'ERP', 'Analytics', 'E-commerce', 'Marketing', 'Support'].map((tool, idx) => (
                        <div key={idx} className="bg-muted/50 rounded-lg p-3 text-center border hover:border-primary transition-colors">
                          <div className="text-sm font-medium">{tool}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">AI Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From intelligent chatbots to complex workflow automation, we deliver solutions that drive real business results.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="p-8 group hover:scale-105 transition-transform duration-300">
                <div className="p-3 bg-primary rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="bitpixel-primary" size="lg">
              <Link to="/services">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How We <span className="text-primary">Transform</span> Your Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven methodology ensures your automation project delivers maximum ROI and long-term success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: BarChart3,
                title: "Analyze & Discover",
                description: "We audit your processes to identify automation opportunities and calculate potential ROI."
              },
              {
                step: "02",
                icon: Lightbulb,
                title: "Design & Plan",
                description: "Create detailed automation blueprints with timelines, technologies, and success metrics."
              },
              {
                step: "03",
                icon: Bot,
                title: "Build & Test",
                description: "Develop, integrate, and rigorously test your AI agents and automation workflows."
              },
              {
                step: "04",
                icon: Rocket,
                title: "Deploy & Scale",
                description: "Launch with monitoring, training, and continuous optimization for maximum performance."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-20 bg-muted/30 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about AI automation and how we can help transform your business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-card/50 backdrop-blur-sm rounded-xl border px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  How long does it take to implement AI automation?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Implementation timelines vary based on complexity. Simple no-code workflows can be deployed in 1-2 weeks, 
                  while custom AI agents typically take 2-4 weeks. Complex ERP integrations may require 6-12 weeks. 
                  We provide detailed timelines during our initial consultation and keep you updated throughout the process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card/50 backdrop-blur-sm rounded-xl border px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  What kind of ROI can I expect from AI automation?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our clients typically see 200-500% ROI within 6-12 months. The average across all projects is 340% ROI. 
                  Benefits include reduced operational costs, increased efficiency, 24/7 availability, and improved accuracy. 
                  We provide detailed ROI projections during the planning phase and track actual performance post-implementation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card/50 backdrop-blur-sm rounded-xl border px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Do I need technical expertise to manage AI automation?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Not at all! We design user-friendly interfaces and provide comprehensive training for your team. 
                  Most of our solutions feature no-code management dashboards where you can monitor performance, 
                  adjust settings, and view analytics without any technical knowledge. We also provide ongoing support and maintenance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card/50 backdrop-blur-sm rounded-xl border px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Can AI automation integrate with my existing tools?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! We specialize in connecting AI automation with your existing software stack. We work with 300+ popular 
                  business tools including CRMs, ERPs, marketing platforms, and communication tools. Our API-first approach 
                  ensures compatibility with custom software and legacy systems.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card/50 backdrop-blur-sm rounded-xl border px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  What makes BitPixel different from other automation companies?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  We're AI-first specialists focused on SMEs. Unlike generic automation providers, we understand the unique 
                  challenges of growing businesses. We offer transparent pricing, rapid implementation, and combine cutting-edge 
                  AI with proven no-code platforms. Our 98% success rate and 340% average ROI speak to our expertise and commitment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-6">Still have questions?</p>
            <Button asChild variant="bitpixel-primary-outline" size="lg">
              <Link to="/contact">
                Schedule a Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-primary">Automate</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Join 50+ businesses that have transformed their operations with our AI automation solutions. 
              Start with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Start Your Project Today
                  <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="backdrop-blur-sm group">
                <Link to="/case-studies">
                  See Success Stories
                  <Play className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;