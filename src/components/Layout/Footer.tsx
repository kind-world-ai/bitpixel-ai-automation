import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Mail, Phone, MapPin, ArrowRight, Zap, Code, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'LLM Agent Development',
    'n8n Workflow Automation',
    'Python Process Automation',
    'AI-Powered Applications',
    'ERP/CRM Systems',
    'Workflow Optimization'
  ];

  const technologies = [
    'Claude AI', 'ChatGPT', 'n8n', 'Make.com', 'Zapier', 
    'Python', 'React', 'Laravel', 'Supabase', 'WeWeb'
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
    <footer className="relative bg-card border-t overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-white dark:bg-white rounded-lg p-2 shadow-md">
                  <img 
                    src="/singlelogo.png" 
                    alt="BitPixel Coders" 
                    className="h-8 w-auto object-contain"
                  />
                  <div className="hidden w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">BitPixel Coders</h3>
                  <p className="text-sm text-muted-foreground">AI & Automation Specialists</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Transform your business with intelligent automation, custom AI agents, and future-proof solutions. 
                We build systems that work 24/7 so you can focus on growth.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:hello@bitpixelcoders.com" className="hover:text-foreground transition-colors">
                    hello@bitpixelcoders.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                    +1 (234) 567-8900
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Global Remote • US • India • Australia</span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 flex items-center text-foreground">
                <Code className="w-5 h-5 mr-2 text-primary" />
                AI & Automation Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to="/services"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Technologies */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 flex items-center text-foreground">
                <Database className="w-5 h-5 mr-2 text-secondary" />
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="mt-8">
                <h5 className="text-sm font-medium text-muted-foreground mb-3">Quick Links</h5>
                <ul className="space-y-2">
                  <li>
                    <Link to="/automation-scorecard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      Free Automation Scorecard
                    </Link>
                  </li>
                  <li>
                    <Link to="/case-studies" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      Success Stories
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      AI Automation Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Stay Updated on AI Automation</h4>
                  <p className="text-muted-foreground text-sm">Get insights, tips, and case studies delivered to your inbox</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-[250px]"
                  />
                  <Button className="flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-muted-foreground text-sm mb-4 md:mb-0">
                © {currentYear} BitPixel Coders. All rights reserved. Built for the AI automation era.
              </div>
              <div className="flex items-center space-x-6">
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Terms of Service
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;