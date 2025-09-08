import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle,
  Zap,
  Bot,
  Users,
  TrendingUp
} from 'lucide-react';
import { apiService } from '../services/api';
import { Lead } from '../types/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';

interface FormData extends Omit<Lead, 'automation_scorecard_data'> {
  services_interested: string[];
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
    company_size: '',
    industry: '',
    project_type: '',
    message: '',
    services_interested: [],
    estimated_budget: undefined,
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const services = [
    'LLM Agent Development',
    'No-Code Automation (n8n/Make.com)',
    'Python Automation Scripts',
    'AI-Powered Applications',
    'ERP/CRM Systems',
    'Workflow Optimization'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  const budgetRanges = [
    { value: 2500, label: '$2,500 - $5,000' },
    { value: 7500, label: '$5,000 - $10,000' },
    { value: 15000, label: '$10,000 - $20,000' },
    { value: 30000, label: '$20,000 - $40,000' },
    { value: 50000, label: '$40,000+' }
  ];

  const timelines = [
    'ASAP',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Just exploring'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services_interested: prev.services_interested.includes(service)
        ? prev.services_interested.filter(s => s !== service)
        : [...prev.services_interested, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const leadData: Lead = {
        ...formData,
        estimated_budget: formData.estimated_budget ? Number(formData.estimated_budget) : undefined
      };

      const response = await apiService.submitLead(leadData);
      
      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! We\'ll get back to you within 24 hours to discuss your automation needs.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          job_title: '',
          company_size: '',
          industry: '',
          project_type: '',
          message: '',
          services_interested: [],
          estimated_budget: undefined,
          timeline: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Something went wrong. Please try again or email us directly.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
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
              Let's Build Your AI Future
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Ready to transform your business with intelligent automation? 
              Let's discuss how we can help you save time, reduce costs, and scale efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-muted-foreground">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-500" />
                <span>24hr response time</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-secondary" />
                <span>ROI-focused solutions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center">
                    <Bot className="w-8 h-8 mr-3 text-primary" />
                    Start Your Automation Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submitStatus === 'success' && (
                    <Alert className="mb-6 border-green-500/50 bg-green-500/10">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertDescription className="text-green-400">
                        {submitMessage}
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === 'error' && (
                    <Alert className="mb-6 border-red-500/50 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-400">
                        {submitMessage}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="job_title">Job Title</Label>
                        <Input
                          id="job_title"
                          name="job_title"
                          value={formData.job_title}
                          onChange={handleInputChange}
                          placeholder="CEO, CTO, Operations Manager..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company_size">Company Size</Label>
                        <Select value={formData.company_size} onValueChange={(value) => setFormData(prev => ({ ...prev, company_size: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            {companySizes.map(size => (
                              <SelectItem key={size} value={size}>{size}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Services Interested */}
                    <div className="space-y-3">
                      <Label>Services You're Interested In</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {services.map(service => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={formData.services_interested.includes(service)}
                              onCheckedChange={() => handleServiceToggle(service)}
                            />
                            <Label htmlFor={service} className="text-sm font-normal cursor-pointer">
                              {service}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="estimated_budget">Estimated Budget</Label>
                        <Select value={formData.estimated_budget?.toString() || ''} onValueChange={(value) => setFormData(prev => ({ ...prev, estimated_budget: value ? Number(value) : undefined }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map(range => (
                              <SelectItem key={range.value} value={range.value.toString()}>{range.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Project Timeline</Label>
                        <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {timelines.map(timeline => (
                              <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about your project *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        placeholder="Describe your current processes, challenges, and what you'd like to automate. The more details you provide, the better we can help you."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg py-6"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-secondary" />
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Email Us</div>
                      <a href="mailto:hello@bitpixelcoders.com" className="text-muted-foreground hover:text-foreground transition-colors">
                        hello@bitpixelcoders.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Call Us</div>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-foreground transition-colors">
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Locations</div>
                      <div className="text-muted-foreground">Global Remote Team</div>
                      <div className="text-sm text-muted-foreground">US • India • Australia</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Response Time</div>
                      <div className="text-muted-foreground">Within 24 hours</div>
                      <div className="text-sm text-muted-foreground">Usually much faster</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Questions?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium text-primary mb-1">How much does automation cost?</div>
                    <div className="text-sm text-muted-foreground">Projects typically range from $2,500 to $50,000+ depending on complexity and scope.</div>
                  </div>
                  <div>
                    <div className="font-medium text-primary mb-1">How long does implementation take?</div>
                    <div className="text-sm text-muted-foreground">Most projects are completed within 2-8 weeks, depending on requirements.</div>
                  </div>
                  <div>
                    <div className="font-medium text-primary mb-1">Do you provide ongoing support?</div>
                    <div className="text-sm text-muted-foreground">Yes, we offer maintenance, monitoring, and optimization services.</div>
                  </div>
                  <div>
                    <div className="font-medium text-primary mb-1">Can you work with existing systems?</div>
                    <div className="text-sm text-muted-foreground">Absolutely. We specialize in integrating with your current tools and workflows.</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;