import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Users, 
  Filter,
  Star,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CaseStudy } from '../types/api';
import { apiService } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const CaseStudies: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const projectTypes = [
    { value: 'all', label: 'All Projects' },
    { value: 'ai_automation', label: 'AI Automation' },
    { value: 'intelligent_agents', label: 'AI Agents' },
    { value: 'workflow_optimization', label: 'Process Automation' },
    { value: 'document_processing', label: 'Document AI' },
    { value: 'customer_service', label: 'Customer AI' },
  ];

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await apiService.getCaseStudies();
        if (response.success) {
          setCaseStudies(response.data);
          setFilteredStudies(response.data);
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  useEffect(() => {
    let filtered = caseStudies;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(study => study.project_type === selectedType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(study =>
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudies(filtered);
  }, [caseStudies, selectedType, searchTerm]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading AI automation success stories...</p>
        </div>
      </div>
    );
  }

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
              AI Automation Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Real businesses achieving extraordinary results through intelligent automation. 
              From custom AI agents to complete workflow transformations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-8 text-muted-foreground">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  <span>Average 450% ROI</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <span>80k+ Hours Automated</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-secondary" />
                  <span>95% Client Satisfaction</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search AI automation projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
              {projectTypes.map((type) => (
                <Button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  variant={selectedType === type.value ? "default" : "ghost"}
                  size="sm"
                  className={selectedType === type.value ? "bg-gradient-to-r from-primary to-secondary" : ""}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-muted-foreground text-sm">
            Showing {filteredStudies.length} of {caseStudies.length} AI automation projects
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredStudies.length === 0 ? (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">No automation projects found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or explore our full range of AI solutions.</p>
              <Button
                onClick={() => {
                  setSelectedType('all');
                  setSearchTerm('');
                }}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                Show All Projects
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredStudies.map((study) => (
                <motion.div key={study.id} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group border-border/50 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-2xl">{study.title}</CardTitle>
                            {study.is_featured && (
                              <Star className="w-5 h-5 text-secondary fill-current" />
                            )}
                          </div>
                          <CardDescription className="flex items-center space-x-4">
                            <span>{study.client_name}</span>
                            {study.client_industry && (
                              <>
                                <span>•</span>
                                <span>{study.client_industry}</span>
                              </>
                            )}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {study.project_type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {study.summary}
                      </p>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">AI Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.tech_stack.slice(0, 4).map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="border-secondary/50 text-secondary">
                              {tech}
                            </Badge>
                          ))}
                          {study.tech_stack.length > 4 && (
                            <Badge variant="outline" className="text-muted-foreground">
                              +{study.tech_stack.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Metrics */}
                      {study.metrics_after && Object.keys(study.metrics_after).length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">Automation Results</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(study.metrics_after).slice(0, 4).map(([key, value]) => (
                              <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                                <div className="text-lg font-bold text-primary">{value}</div>
                                <div className="text-xs text-muted-foreground capitalize">{key.replace('_', ' ')}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timeline & Value */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {study.time_to_implementation_days 
                            ? `${study.time_to_implementation_days} days delivery`
                            : 'Custom timeline'
                          }
                        </div>
                        {study.project_value && (
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            ${study.project_value.toLocaleString()} value
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4">
                        <Link
                          to={`/case-studies/${study.slug}`}
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group-hover:translate-x-1 transform duration-300"
                        >
                          View Full Project
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                        
                        <div className="flex items-center space-x-2">
                          {study.demo_url && (
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="p-2 h-auto"
                            >
                              <a
                                href={study.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View Demo"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/50 to-secondary/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the businesses that have transformed their operations with our AI automation solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-xl px-12 py-4 h-auto">
                <Link to="/contact">
                  Start Your Project
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

export default CaseStudies;
