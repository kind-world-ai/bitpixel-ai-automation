import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Target,
  Award,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Progress } from '../components/ui/progress';

interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale';
  options: Array<{
    value: string;
    label: string;
    score: number;
  }>;
  category: 'current_state' | 'pain_points' | 'resources' | 'goals';
}

interface ScoreResult {
  overall: number;
  categories: {
    current_state: number;
    pain_points: number;
    resources: number;
    goals: number;
  };
  recommendations: string[];
  priority_areas: string[];
}

const AutomationScorecard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const questions: Question[] = [
    {
      id: 'business_size',
      question: 'What is the size of your business?',
      type: 'single',
      category: 'current_state',
      options: [
        { value: 'solopreneur', label: 'Solopreneur (just me)', score: 3 },
        { value: 'small', label: '2-10 employees', score: 4 },
        { value: 'medium', label: '11-50 employees', score: 5 },
        { value: 'growing', label: '51+ employees', score: 4 }
      ]
    },
    {
      id: 'current_automation',
      question: 'How much automation do you currently use?',
      type: 'single',
      category: 'current_state',
      options: [
        { value: 'none', label: 'No automation at all', score: 5 },
        { value: 'basic', label: 'Basic tools (email templates, scheduling)', score: 4 },
        { value: 'moderate', label: 'Some workflows (Zapier, basic integrations)', score: 3 },
        { value: 'advanced', label: 'Advanced automation systems', score: 2 }
      ]
    },
    {
      id: 'time_spent_repetitive',
      question: 'How much time do you/your team spend on repetitive tasks daily?',
      type: 'single',
      category: 'pain_points',
      options: [
        { value: 'minimal', label: 'Less than 1 hour', score: 2 },
        { value: 'moderate', label: '1-3 hours', score: 3 },
        { value: 'significant', label: '3-5 hours', score: 4 },
        { value: 'excessive', label: 'More than 5 hours', score: 5 }
      ]
    },
    {
      id: 'biggest_challenges',
      question: 'What are your biggest operational challenges? (Select all that apply)',
      type: 'multiple',
      category: 'pain_points',
      options: [
        { value: 'lead_qualification', label: 'Lead qualification and follow-up', score: 1 },
        { value: 'customer_support', label: 'Customer support response time', score: 1 },
        { value: 'data_entry', label: 'Manual data entry and processing', score: 1 },
        { value: 'reporting', label: 'Creating reports and analytics', score: 1 },
        { value: 'inventory', label: 'Inventory management', score: 1 },
        { value: 'scheduling', label: 'Appointment scheduling', score: 1 },
        { value: 'invoicing', label: 'Invoicing and payments', score: 1 },
        { value: 'social_media', label: 'Social media management', score: 1 }
      ]
    },
    {
      id: 'technical_expertise',
      question: 'What is your team\'s technical expertise level?',
      type: 'single',
      category: 'resources',
      options: [
        { value: 'non_technical', label: 'Non-technical team', score: 5 },
        { value: 'basic', label: 'Basic technical skills', score: 4 },
        { value: 'intermediate', label: 'Intermediate technical skills', score: 3 },
        { value: 'advanced', label: 'Advanced technical team', score: 2 }
      ]
    },
    {
      id: 'budget_range',
      question: 'What is your monthly budget for automation tools and solutions?',
      type: 'single',
      category: 'resources',
      options: [
        { value: 'minimal', label: 'Under $500/month', score: 3 },
        { value: 'moderate', label: '$500-$2,000/month', score: 4 },
        { value: 'substantial', label: '$2,000-$5,000/month', score: 5 },
        { value: 'unlimited', label: '$5,000+/month', score: 5 }
      ]
    },
    {
      id: 'growth_goals',
      question: 'What are your primary business goals for the next 12 months?',
      type: 'multiple',
      category: 'goals',
      options: [
        { value: 'increase_revenue', label: 'Increase revenue by 50%+', score: 1 },
        { value: 'reduce_costs', label: 'Reduce operational costs', score: 1 },
        { value: 'improve_efficiency', label: 'Improve team efficiency', score: 1 },
        { value: 'scale_operations', label: 'Scale operations without hiring', score: 1 },
        { value: 'better_customer_service', label: 'Improve customer satisfaction', score: 1 },
        { value: 'data_insights', label: 'Get better business insights', score: 1 }
      ]
    },
    {
      id: 'urgency_level',
      question: 'How urgent is your need for automation?',
      type: 'single',
      category: 'goals',
      options: [
        { value: 'immediate', label: 'Immediate (within 30 days)', score: 5 },
        { value: 'soon', label: 'Soon (within 3 months)', score: 4 },
        { value: 'planning', label: 'Planning phase (3-6 months)', score: 3 },
        { value: 'exploring', label: 'Just exploring options', score: 2 }
      ]
    }
  ];

  const calculateScore = (): ScoreResult => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    const categoryScores = {
      current_state: 0,
      pain_points: 0,
      resources: 0,
      goals: 0
    };
    const categoryMaxScores = {
      current_state: 0,
      pain_points: 0,
      resources: 0,
      goals: 0
    };

    questions.forEach(question => {
      const answer = answers[question.id];
      if (!answer) return;

      if (question.type === 'single') {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          const score = option.score;
          totalScore += score;
          categoryScores[question.category] += score;
        }
      } else if (question.type === 'multiple' && Array.isArray(answer)) {
        const score = answer.length * 1; // Each selection adds 1 point
        totalScore += score;
        categoryScores[question.category] += score;
      }

      // Calculate max possible score for percentage
      if (question.type === 'single') {
        const maxScore = Math.max(...question.options.map(opt => opt.score));
        maxPossibleScore += maxScore;
        categoryMaxScores[question.category] += maxScore;
      } else if (question.type === 'multiple') {
        const maxScore = question.options.length;
        maxPossibleScore += maxScore;
        categoryMaxScores[question.category] += maxScore;
      }
    });

    const overallPercentage = Math.round((totalScore / maxPossibleScore) * 100);
    
    const recommendations = [];
    const priorityAreas = [];

    // Generate recommendations based on score
    if (overallPercentage >= 80) {
      recommendations.push("Perfect candidate for advanced AI automation");
      recommendations.push("Consider custom AI agents and multi-system integrations");
      recommendations.push("ROI potential: 300-500% within 6 months");
      priorityAreas.push("Custom AI Development", "Advanced Workflow Automation");
    } else if (overallPercentage >= 60) {
      recommendations.push("Great automation potential with high ROI");
      recommendations.push("Start with no-code solutions and gradually add AI");
      recommendations.push("Expected ROI: 200-400% within 6-12 months");
      priorityAreas.push("No-Code Automation", "Process Optimization");
    } else if (overallPercentage >= 40) {
      recommendations.push("Good foundation for automation implementation");
      recommendations.push("Focus on quick wins and gradual scaling");
      recommendations.push("Expected ROI: 150-300% within 12 months");
      priorityAreas.push("Workflow Optimization", "Basic Automation");
    } else {
      recommendations.push("Build automation foundation gradually");
      recommendations.push("Start with simple tools and basic training");
      recommendations.push("Expected ROI: 100-200% within 12-18 months");
      priorityAreas.push("Process Analysis", "Team Training");
    }

    return {
      overall: overallPercentage,
      categories: {
        current_state: Math.round((categoryScores.current_state / categoryMaxScores.current_state) * 100),
        pain_points: Math.round((categoryScores.pain_points / categoryMaxScores.pain_points) * 100),
        resources: Math.round((categoryScores.resources / categoryMaxScores.resources) * 100),
        goals: Math.round((categoryScores.goals / categoryMaxScores.goals) * 100)
      },
      recommendations,
      priority_areas: priorityAreas
    };
  };

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const scoreResult = calculateScore();
      setResult(scoreResult);
      setCurrentStep(questions.length); // Move to contact info step
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitScorecard = async () => {
    if (!result) return;

    setIsSubmitting(true);
    try {
      await apiService.submitAutomationScorecard({
        ...contactInfo,
        current_processes: {
          manual_tasks_hours: 8,
          repetitive_processes: ['Data entry', 'Report generation'],
          data_entry_frequency: 'daily',
          approval_workflows: 5
        },
        pain_points: {
          biggest_challenges: [],
          time_consuming_tasks: [],
          error_prone_areas: [],
          bottlenecks: []
        },
        automation_readiness: {
          current_tools: [],
          tech_comfort_level: 'intermediate',
          budget_range: 'moderate',
          timeline_preference: 'soon'
        },
        desired_outcomes: {
          primary_goals: [],
          success_metrics: [],
          roi_expectations: '200-300%'
        }
      });
      setIsCompleted(true);
    } catch (error) {
      console.error('Error submitting scorecard:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-16 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your automation scorecard has been submitted. We'll be in touch within 24 hours 
              with your personalized automation strategy and next steps.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
                <Link to="/">
                  Return Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/case-studies">
                  View Success Stories
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Calculator className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                Automation Scorecard
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Discover your automation potential and get a personalized roadmap for transforming your business with AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentStep < questions.length 
                  ? `${currentStep + 1} of ${questions.length}`
                  : result ? 'Results' : 'Contact Info'
                }
              </span>
            </div>
            <Progress 
              value={currentStep < questions.length ? progress : 100} 
              className="h-2"
            />
          </div>

          <AnimatePresence mode="wait">
            {currentStep < questions.length ? (
              // Questions
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentQuestion.type === 'single' ? (
                      currentQuestion.options.map((option) => (
                        <Label
                          key={option.value}
                          className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-all duration-300"
                        >
                          <input
                            type="radio"
                            name={currentQuestion.id}
                            value={option.value}
                            checked={answers[currentQuestion.id] === option.value}
                            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                            className="w-4 h-4 text-primary bg-transparent border-border focus:ring-primary"
                          />
                          <span className="ml-3 text-lg">{option.label}</span>
                        </Label>
                      ))
                    ) : (
                      currentQuestion.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <Checkbox
                            id={option.value}
                            checked={Array.isArray(answers[currentQuestion.id]) && 
                              (answers[currentQuestion.id] as string[]).includes(option.value)}
                            onCheckedChange={(checked) => {
                              const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
                              if (checked) {
                                handleAnswer(currentQuestion.id, [...currentAnswers, option.value]);
                              } else {
                                handleAnswer(currentQuestion.id, currentAnswers.filter(a => a !== option.value));
                              }
                            }}
                          />
                          <Label htmlFor={option.value} className="text-lg cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))
                    )}

                    <div className="flex justify-between mt-8">
                      <Button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        variant="outline"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <Button
                        onClick={nextStep}
                        disabled={!answers[currentQuestion.id] || 
                          (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        {currentStep === questions.length - 1 ? 'Calculate Score' : 'Next'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : result && currentStep === questions.length ? (
              // Results
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Overall Score */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
                  <CardContent className="p-8 text-center">
                    <div className="flex items-center justify-center mb-6">
                      <Award className="w-12 h-12 text-secondary mr-4" />
                      <h2 className="text-3xl font-bold">Your Automation Score</h2>
                    </div>
                    
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
                      {result.overall}%
                    </div>
                    
                    <p className="text-xl text-muted-foreground mb-6">
                      {result.overall >= 80 ? "Excellent automation potential!" :
                       result.overall >= 60 ? "Great opportunity for automation" :
                       result.overall >= 40 ? "Good foundation for automation" :
                       "Ready to start your automation journey"}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(result.categories).map(([category, score]) => (
                        <div key={category} className="text-center">
                          <div className="text-2xl font-bold text-primary">{score}%</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {category.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Lightbulb className="w-6 h-6 mr-3 text-secondary" />
                      Personalized Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">{rec}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Priority Areas */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Target className="w-6 h-6 mr-3 text-primary" />
                      Priority Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {result.priority_areas.map((area, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-primary/20 text-primary border-primary/20"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button
                    onClick={() => setCurrentStep(questions.length + 1)}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary text-lg px-8"
                  >
                    Get Your Personalized Strategy
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              // Contact Info
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get Your Personalized Automation Strategy</CardTitle>
                    <p className="text-muted-foreground">
                      Enter your contact information to receive a detailed automation roadmap and schedule a free consultation with our experts.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          type="email"
                          id="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          value={contactInfo.company}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Your company name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          type="tel"
                          id="phone"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button
                        onClick={() => setCurrentStep(questions.length)}
                        variant="outline"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Results
                      </Button>

                      <Button
                        onClick={submitScorecard}
                        disabled={!contactInfo.name || !contactInfo.email || !contactInfo.company || isSubmitting}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        {isSubmitting ? 'Submitting...' : 'Get My Strategy'}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default AutomationScorecard;