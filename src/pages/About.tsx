import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  Lightbulb,
  Code,
  Bot,
  TrendingUp,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Brain,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const About: React.FC = () => {
  const values = [
    {
      icon: Brain,
      title: "AI-First Thinking",
      description: "We approach every business challenge with AI and automation at the forefront, ensuring scalable and intelligent solutions."
    },
    {
      icon: Rocket,
      title: "Results-Driven",
      description: "Every project is measured by tangible ROI, efficiency gains, and long-term business impact. We deliver outcomes, not just outputs."
    },
    {
      icon: Users,
      title: "Human-Centric",
      description: "While we automate processes, we never forget the human element. Our solutions empower people to focus on what matters most."
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "Serving SMEs across US, India, and Australia, we understand diverse business environments and regulatory requirements."
    }
  ];

  const expertise = [
    {
      icon: Bot,
      title: "LLM & AI Agents",
      technologies: ["Claude", "ChatGPT", "LangChain", "Vector DBs"],
      description: "Custom AI agents that understand context, learn from interactions, and automate complex decision-making processes."
    },
    {
      icon: Zap,
      title: "No-Code Automation",
      technologies: ["n8n", "Make.com", "Zapier", "Bubble"],
      description: "Visual workflow builders that connect your existing tools without writing a single line of code."
    },
    {
      icon: Code,
      title: "Custom Development",
      technologies: ["Python", "React", "Laravel", "Node.js"],
      description: "Bespoke automation solutions when off-the-shelf tools can't meet your specific business requirements."
    }
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "Started as a full-stack development agency" },
    { year: "2022", title: "AI Pivot", description: "Specialized in AI and automation solutions" },
    { year: "2023", title: "Scale Up", description: "50+ successful automation projects delivered" },
    { year: "2024", title: "Global Reach", description: "Expanded to serve SMEs across three continents" }
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
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Pioneering AI Automation
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              We're BitPixel Coders - a team of AI automation specialists helping SMEs transform their 
              operations with intelligent agents, workflows, and custom solutions that drive real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl w-fit mb-4">
                    <Target className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-4xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    To democratize AI automation for SMEs worldwide, making intelligent business processes 
                    accessible, affordable, and impactful. We believe every business deserves the competitive 
                    advantage of AI, regardless of size or technical expertise.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-secondary/20">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-br from-secondary to-primary rounded-xl w-fit mb-4">
                    <Lightbulb className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-4xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A world where every business operates at peak efficiency through intelligent automation, 
                    freeing human creativity to focus on innovation, strategy, and meaningful customer relationships 
                    while AI handles the routine.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide every project, decision, and client interaction as we build the future of automated business.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep specialization in the technologies and methodologies that power modern business automation.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {expertise.map((area, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                      <area.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl">{area.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{area.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-secondary/20 text-secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From traditional development to AI automation pioneers - our evolution mirrors the transformation we bring to our clients.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background"></div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <Card className="border-border/50">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Impact by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Numbers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results that speak to our commitment to delivering transformative automation solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, value: "340%", label: "Average ROI Increase" },
              { icon: Users, value: "50+", label: "Happy Clients" },
              { icon: Zap, value: "45k+", label: "Hours Automated" },
              { icon: Award, value: "98%", label: "Project Success Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Choose Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just another development agency - we're your automation transformation partners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Native Approach",
                description: "Every solution is designed with AI at its core, ensuring future-ready automation that scales with your business."
              },
              {
                icon: Target,
                title: "SME Specialists",
                description: "We understand the unique challenges and opportunities of small to medium enterprises across different markets."
              },
              {
                icon: TrendingUp,
                title: "Proven ROI",
                description: "340% average ROI across our projects. We measure success by your business growth, not just technical metrics."
              },
              {
                icon: Zap,
                title: "Rapid Implementation",
                description: "From concept to deployment in weeks, not months. Our agile methodology ensures quick time-to-value."
              },
              {
                icon: Users,
                title: "Ongoing Partnership",
                description: "We don't disappear after deployment. Continuous optimization and support ensure long-term success."
              },
              {
                icon: Globe,
                title: "Global Experience",
                description: "Serving clients across three continents gives us unique insights into diverse business environments."
              }
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <reason.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the businesses that have already revolutionized their operations with our AI automation solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-xl px-12 py-4 h-auto">
                <Link to="/contact">
                  Start Your Journey
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-xl px-12 py-4 h-auto border-2">
                <Link to="/automation-scorecard">
                  Get Free Assessment
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;