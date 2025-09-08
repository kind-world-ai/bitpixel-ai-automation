import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  Search,
  Filter,
  TrendingUp,
  Bot,
  Zap,
  Code,
  Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock blog posts data - in a real app, this would come from an API
  const blogPosts = [
    {
      id: 1,
      title: "Building Your First AI Agent: A Complete Guide for SMEs",
      slug: "building-first-ai-agent-sme-guide",
      summary: "Learn how to create custom AI agents using Claude and ChatGPT to automate customer service, lead qualification, and business processes.",
      content: "Full content would be here...",
      author: "BitPixel Team",
      category: "AI Agents",
      tags: ["AI", "Automation", "Claude", "ChatGPT"],
      readTime: 8,
      publishDate: "2024-09-05",
      featured: true,
      image: "/api/placeholder/600/300"
    },
    {
      id: 2,
      title: "n8n vs Make.com vs Zapier: Which Automation Platform is Right for You?",
      slug: "n8n-make-zapier-comparison-2024",
      summary: "A comprehensive comparison of the top three no-code automation platforms, including pricing, features, and use cases for different business sizes.",
      content: "Full content would be here...",
      author: "BitPixel Team",
      category: "No-Code",
      tags: ["n8n", "Make.com", "Zapier", "Automation"],
      readTime: 12,
      publishDate: "2024-09-03",
      featured: true,
      image: "/api/placeholder/600/300"
    },
    {
      id: 3,
      title: "ROI Calculator: Measuring the Impact of Business Automation",
      slug: "automation-roi-calculator-guide",
      summary: "Discover how to calculate the true ROI of your automation investments with our proven framework and real case study examples.",
      content: "Full content would be here...",
      author: "BitPixel Team",
      category: "Business Strategy",
      tags: ["ROI", "Analytics", "Business", "Strategy"],
      readTime: 10,
      publishDate: "2024-09-01",
      featured: false,
      image: "/api/placeholder/600/300"
    },
    {
      id: 4,
      title: "Python Automation Scripts Every Business Should Know",
      slug: "essential-python-automation-scripts-business",
      summary: "15 practical Python scripts that can automate common business tasks like data processing, report generation, and API integrations.",
      content: "Full content would be here...",
      author: "BitPixel Team",
      category: "Development",
      tags: ["Python", "Scripts", "Automation", "Development"],
      readTime: 15,
      publishDate: "2024-08-28",
      featured: false,
      image: "/api/placeholder/600/300"
    },
    {
      id: 5,
      title: "The Future of AI in Small Business: Trends for 2024-2025",
      slug: "future-ai-small-business-trends-2024-2025",
      summary: "Explore emerging AI trends that will shape small business operations, from conversational AI to predictive analytics and automation workflows.",
      content: "Full content would be here...",
      author: "BitPixel Team",
      category: "AI Trends",
      tags: ["AI", "Trends", "Future", "Small Business"],
      readTime: 7,
      publishDate: "2024-08-25",
      featured: false,
      image: "/api/placeholder/600/300"
    },
    {
      id: 6,
      title: "Case Study: How We Automated Lead Qualification with Claude AI",
      slug: "claude-ai-lead-qualification-case-study",
      summary: "A detailed walkthrough of how we built a Claude AI agent that qualifies leads 24/7, resulting in 300% improvement in conversion rates.",
      content: "Full content would be here...",
      author: "BitPixel Team",
      category: "Case Studies",
      tags: ["Claude", "AI", "Lead Generation", "Case Study"],
      readTime: 12,
      publishDate: "2024-08-22",
      featured: true,
      image: "/api/placeholder/600/300"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Posts', icon: TrendingUp },
    { value: 'AI Agents', label: 'AI Agents', icon: Bot },
    { value: 'No-Code', label: 'No-Code Automation', icon: Zap },
    { value: 'Development', label: 'Development', icon: Code },
    { value: 'AI Trends', label: 'AI Trends', icon: Brain },
    { value: 'Business Strategy', label: 'Business Strategy', icon: TrendingUp },
    { value: 'Case Studies', label: 'Case Studies', icon: ArrowRight }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

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
              AI Automation Insights
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Expert guides, case studies, and insights to help you master AI automation, 
              no-code workflows, and intelligent business processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-4 h-auto">
                <Link to="/automation-scorecard">
                  Get Free Automation Score
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 h-auto border-2">
                <Link to="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Articles</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our most popular and impactful content to help you get started with AI automation.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {featuredPosts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-4xl">📄</div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime} min
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 line-clamp-3 text-base">
                      {post.summary}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <Link to={`/blog/${post.slug}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    variant={selectedCategory === category.value ? "default" : "ghost"}
                    size="sm"
                    className={selectedCategory === category.value ? "bg-gradient-to-r from-primary to-secondary" : ""}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 text-muted-foreground text-sm">
            Showing {filteredPosts.length} of {blogPosts.length} articles
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search terms or category filters.</p>
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                Show All Articles
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-4 gap-6">
                        {/* Featured Image Placeholder */}
                        <div className="aspect-video md:aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                          <div className="text-3xl">📄</div>
                        </div>
                        
                        {/* Content */}
                        <div className="md:col-span-3">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              {post.category}
                            </Badge>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.publishDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.readTime} min read
                            </div>
                          </div>
                          
                          <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                            {post.title}
                          </h2>
                          
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {post.summary}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="border-secondary/50 text-secondary">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <User className="w-4 h-4 mr-2" />
                              By {post.author}
                            </div>
                            <Button asChild className="bg-gradient-to-r from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary">
                              <Link to={`/blog/${post.slug}`}>
                                Read Full Article
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
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

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/50 to-secondary/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stay Updated with AI Automation
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get the latest insights, case studies, and automation strategies delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-gradient-to-r from-primary to-secondary">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;