import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Workflow, 
  Code, 
  Brain, 
  Database, 
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Services: React.FC = () => {
  const services = [
    {
      icon: Bot,
      title: "LLM Agent Development",
      subtitle: "Custom AI agents that work 24/7",
      description: "Build intelligent agents powered by Claude, ChatGPT, and open-source models. Multi-agent systems for complex business processes with natural language understanding.",
      features: [
        "Conversational AI interfaces",
        "Multi-agent orchestration",
        "Custom knowledge bases",
        "API integrations",
        "Real-time learning",
        "Performance monitoring"
      ],
      technologies: ["Claude", "ChatGPT", "LangChain", "Python", "FastAPI", "Vector DBs"],
      useCases: [
        "Customer support automation",
        "Document processing agents",
        "Sales qualification bots",
        "Content generation systems"
      ],
      startingPrice: "$2,500",
      deliveryTime: "2-4 weeks"
    },
    {
      icon: Workflow,
      title: "No-Code Automation",
      subtitle: "Visual workflows that scale",
      description: "Advanced n8n workflows, Make.com integrations, and Zapier solutions. Build complex automation without code using industry-leading platforms.",
      features: [
        "Visual workflow builder",
        "300+ app integrations",
        "Conditional logic",
        "Error handling",
        "Webhook triggers",
        "Real-time monitoring"
      ],
      technologies: ["n8n", "Make.com", "Zapier", "Bubble", "WeWeb", "Airtable"],
      useCases: [
        "Lead qualification pipelines",
        "Data synchronization",
        "Social media automation",
        "Inventory management"
      ],
      startingPrice: "$1,500",
      deliveryTime: "1-3 weeks"
    },
    {
      icon: Code,
      title: "Python Automation",
      subtitle: "Custom scripts and pipelines",
      description: "Robust automation pipelines, data processing, and API integrations built with modern Python frameworks for enterprise-grade reliability.",
      features: [
        "Custom script development",
        "Data processing pipelines",
        "Web scraping solutions",
        "API development",
        "Task scheduling",
        "Error logging"
      ],
      technologies: ["Python", "FastAPI", "Celery", "Pandas", "BeautifulSoup", "SQLAlchemy"],
      useCases: [
        "Data migration scripts",
        "Report automation",
        "Web scraping systems",
        "ETL processes"
      ],
      startingPrice: "$2,000",
      deliveryTime: "2-5 weeks"
    },
    {
      icon: Brain,
      title: "AI-Powered Applications",
      subtitle: "Intelligent web & mobile apps",
      description: "Streaming platforms, mobile applications, and web systems with integrated AI capabilities for enhanced user experiences.",
      features: [
        "Real-time AI processing",
        "Voice interfaces",
        "Computer vision",
        "Predictive analytics",
        "Mobile optimization",
        "Cloud deployment"
      ],
      technologies: ["React", "Node.js", "React Native", "WebRTC", "TensorFlow", "AWS"],
      useCases: [
        "AI-powered dashboards",
        "Intelligent forms",
        "Voice assistants",
        "Image recognition apps"
      ],
      startingPrice: "$5,000",
      deliveryTime: "4-8 weeks"
    },
    {
      icon: Database,
      title: "ERP/CRM Systems",
      subtitle: "Business management automation",
      description: "Comprehensive business management systems with AI insights, automation triggers, and real-time dashboards for complete operational control.",
      features: [
        "Custom business logic",
        "AI-powered insights",
        "Automated reporting",
        "Role-based access",
        "Mobile interfaces",
        "Integration APIs"
      ],
      technologies: ["Laravel", "Supabase", "PostgreSQL", "Redis", "Vue.js", "PWA"],
      useCases: [
        "Sales pipeline automation",
        "Inventory optimization",
        "Customer journey tracking",
        "Performance analytics"
      ],
      startingPrice: "$7,500",
      deliveryTime: "6-12 weeks"
    },
    {
      icon: Zap,
      title: "Workflow Optimization",
      subtitle: "Process analysis & redesign",
      description: "Analyze existing processes, identify bottlenecks, and redesign workflows for maximum efficiency and ROI using proven methodologies.",
      features: [
        "Process mapping",
        "Bottleneck analysis",
        "ROI calculations",
        "Change management",
        "Training programs",
        "Success monitoring"
      ],
      technologies: ["Process Mining", "Analytics", "Optimization", "Monitoring", "Training"],
      useCases: [
        "Operational audits",
        "Digital transformation",
        "Cost reduction initiatives",
        "Efficiency improvements"
      ],
      startingPrice: "$3,000",
      deliveryTime: "3-6 weeks"
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
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              AI & Automation Services
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Transform your business with intelligent automation solutions. From AI agents to workflow optimization, 
              we build systems that work 24/7 so you can focus on growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/automation-scorecard">
                  <Target className="w-5 h-5 mr-2" />
                  Get Free Automation Score
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link to="/contact">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="p-8 hover:shadow-lg transition-all duration-300 group h-full">
                  {/* Service Header */}
                  <CardHeader className="flex flex-row items-start justify-between p-0 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-1">{service.title}</CardTitle>
                        <CardDescription>{service.subtitle}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{service.startingPrice}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.deliveryTime}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Key Features
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                        Common Use Cases
                      </h4>
                      <ul className="space-y-1">
                        {service.useCases.map((useCase, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <TrendingUp className="w-3 h-3 mr-2 text-green-500" />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Button asChild className="w-full">
                      <Link to="/contact">
                        Get Started with {service.title}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Proven Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From discovery to deployment, we follow a systematic approach to ensure your automation project succeeds.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Analysis",
                description: "Deep dive into your processes, pain points, and automation opportunities."
              },
              {
                step: "02",
                title: "Strategy & Design",
                description: "Create detailed automation blueprints with ROI projections and timelines."
              },
              {
                step: "03",
                title: "Build & Test",
                description: "Develop, integrate, and rigorously test your automation solutions."
              },
              {
                step: "04",
                title: "Deploy & Optimize",
                description: "Launch with monitoring, training, and continuous optimization support."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
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
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start with our free automation scorecard to identify your biggest opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/automation-scorecard"
                className="px-12 py-4 bg-gradient-to-r from-ai-blue-600 to-automation-600 hover:from-ai-blue-700 hover:to-automation-700 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Get Free Scorecard
              </Link>
              <Link
                to="/case-studies"
                className="px-12 py-4 border-2 border-white/30 hover:border-white/50 rounded-lg font-semibold text-xl transition-all duration-300 backdrop-blur-sm"
              >
                View Success Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;