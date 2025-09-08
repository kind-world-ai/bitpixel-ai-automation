import axios from 'axios';
import { CaseStudy, Lead, AutomationScorecard, ApiResponse, PaginatedResponse } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Mock data for demo
const mockCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "AI-Powered Customer Service Automation",
    client_name: "TechCorp Solutions",
    client_industry: "Technology",
    project_type: "customer_service",
    is_featured: true,
    is_published: true,
    summary: "Transformed customer support operations with intelligent chatbots and automated ticket routing, reducing response time by 85% and increasing customer satisfaction to 96%.",
    problem_statement: "Manual ticket handling causing 4-hour average response times and customer frustration.",
    solution_description: "Implemented AI chatbots with natural language processing and intelligent ticket routing system.",
    tech_stack: ["OpenAI GPT-4", "Python", "React", "PostgreSQL", "Redis"],
    automation_tools: ["Zapier", "Microsoft Power Automate", "Custom AI Agents"],
    ai_models_used: ["GPT-4", "BERT", "Custom NLP Models"],
    key_features: ["24/7 AI Support", "Intelligent Routing", "Sentiment Analysis", "Auto-Resolution"],
    metrics_after: {
      "Response Time": "12 min",
      "Resolution Rate": "94%",
      "Customer Satisfaction": "96%",
      "Cost Reduction": "67%"
    },
    time_to_implementation_days: 45,
    project_value: 250000,
    slug: "ai-customer-service-automation",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
  },
  {
    id: 2,
    title: "Document Processing AI Agent",
    client_name: "FinanceFlow Inc",
    client_industry: "Financial Services",
    project_type: "document_processing",
    is_featured: true,
    is_published: true,
    summary: "Automated invoice processing and data extraction using computer vision and OCR, processing 10,000+ documents daily with 99.2% accuracy.",
    problem_statement: "Manual document processing taking 40+ hours weekly with frequent errors.",
    solution_description: "Built custom AI agent for document classification, data extraction, and validation.",
    tech_stack: ["TensorFlow", "OpenCV", "FastAPI", "MongoDB", "Docker"],
    automation_tools: ["Custom AI Pipeline", "Azure Cognitive Services", "RPA Bots"],
    ai_models_used: ["YOLO v8", "Tesseract OCR", "Custom CNN"],
    key_features: ["Smart OCR", "Document Classification", "Data Validation", "Workflow Integration"],
    metrics_after: {
      "Processing Speed": "10x faster",
      "Accuracy Rate": "99.2%",
      "Time Saved": "35 hrs/week",
      "Error Reduction": "92%"
    },
    time_to_implementation_days: 30,
    project_value: 180000,
    slug: "document-processing-ai-agent",
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z"
  },
  {
    id: 3,
    title: "Intelligent Sales Process Automation",
    client_name: "GrowthMax Agency",
    client_industry: "Marketing",
    project_type: "ai_automation",
    is_featured: false,
    is_published: true,
    summary: "Streamlined lead qualification and follow-up processes with AI-driven scoring and automated nurturing campaigns, increasing conversion rates by 340%.",
    problem_statement: "Low lead conversion rates and manual follow-up processes causing missed opportunities.",
    solution_description: "Implemented AI lead scoring system with automated email sequences and CRM integration.",
    tech_stack: ["Python", "Scikit-learn", "HubSpot API", "AWS Lambda", "React"],
    automation_tools: ["HubSpot Workflows", "Zapier", "Custom ML Pipeline"],
    ai_models_used: ["Random Forest", "Logistic Regression", "NLP Sentiment Analysis"],
    key_features: ["Lead Scoring", "Auto Follow-up", "Predictive Analytics", "CRM Sync"],
    metrics_after: {
      "Conversion Rate": "+340%",
      "Lead Response": "2 min",
      "Sales Velocity": "+180%",
      "Revenue Growth": "+250%"
    },
    time_to_implementation_days: 21,
    project_value: 320000,
    slug: "intelligent-sales-automation",
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-02-15T00:00:00Z"
  },
  {
    id: 4,
    title: "Smart Inventory Management System",
    client_name: "RetailPro Chain",
    client_industry: "Retail",
    project_type: "workflow_optimization",
    is_featured: false,
    is_published: true,
    summary: "Revolutionized inventory management with predictive analytics and automated reordering, reducing stockouts by 78% and optimizing cash flow.",
    problem_statement: "Frequent stockouts and overstock situations causing revenue loss and storage costs.",
    solution_description: "Built AI-powered demand forecasting system with automated procurement workflows.",
    tech_stack: ["Python", "TensorFlow", "PostgreSQL", "Apache Kafka", "Vue.js"],
    automation_tools: ["Custom ML Pipeline", "SAP Integration", "Automated Alerts"],
    ai_models_used: ["LSTM Networks", "ARIMA", "Prophet Forecasting"],
    key_features: ["Demand Forecasting", "Auto Reordering", "Price Optimization", "Trend Analysis"],
    metrics_after: {
      "Stockout Reduction": "78%",
      "Inventory Turnover": "+45%",
      "Cost Savings": "$2.1M",
      "Forecast Accuracy": "94%"
    },
    time_to_implementation_days: 60,
    project_value: 450000,
    slug: "smart-inventory-management",
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-03-01T00:00:00Z"
  },
  {
    id: 5,
    title: "AI Content Generation Platform",
    client_name: "ContentCraft Media",
    client_industry: "Media & Publishing",
    project_type: "intelligent_agents",
    is_featured: true,
    is_published: true,
    summary: "Created AI-powered content generation system producing high-quality articles, social media posts, and marketing copy at scale, increasing content output by 500%.",
    problem_statement: "High content demand with limited writing resources causing bottlenecks and quality issues.",
    solution_description: "Developed multi-agent AI system for content creation, editing, and optimization.",
    tech_stack: ["OpenAI API", "LangChain", "Next.js", "Supabase", "Vercel"],
    automation_tools: ["Custom AI Agents", "Content Workflows", "Quality Assurance Bots"],
    ai_models_used: ["GPT-4", "Claude-3", "Custom Fine-tuned Models"],
    key_features: ["Multi-format Content", "Brand Voice Training", "SEO Optimization", "Quality Control"],
    metrics_after: {
      "Content Output": "+500%",
      "Quality Score": "92%",
      "Time to Publish": "75% faster",
      "Engagement Rate": "+280%"
    },
    time_to_implementation_days: 35,
    project_value: 380000,
    slug: "ai-content-generation-platform",
    created_at: "2024-03-15T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 6,
    title: "Predictive Maintenance AI System",
    client_name: "ManufactureTech Industries",
    client_industry: "Manufacturing",
    project_type: "ai_automation",
    is_featured: false,
    is_published: true,
    summary: "Implemented IoT sensors and machine learning algorithms to predict equipment failures, reducing downtime by 65% and maintenance costs by 40%.",
    problem_statement: "Unexpected equipment failures causing production delays and high maintenance costs.",
    solution_description: "Deployed IoT sensors with AI-powered predictive analytics for proactive maintenance scheduling.",
    tech_stack: ["Python", "Apache Spark", "InfluxDB", "Grafana", "AWS IoT"],
    automation_tools: ["IoT Sensors", "Automated Alerts", "Maintenance Scheduling"],
    ai_models_used: ["Anomaly Detection", "Time Series Forecasting", "Classification Models"],
    key_features: ["Real-time Monitoring", "Failure Prediction", "Maintenance Scheduling", "Cost Optimization"],
    metrics_after: {
      "Downtime Reduction": "65%",
      "Maintenance Savings": "40%",
      "Prediction Accuracy": "91%",
      "ROI": "420%"
    },
    time_to_implementation_days: 90,
    project_value: 680000,
    slug: "predictive-maintenance-ai",
    created_at: "2024-04-01T00:00:00Z",
    updated_at: "2024-04-01T00:00:00Z"
  }
];

// API endpoints
export const apiService = {
  // Case Studies
  getCaseStudies: async (params?: {
    type?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<ApiResponse<CaseStudy[]>> => {
    // For demo purposes, return mock data immediately
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredStudies = mockCaseStudies;
        
        if (params?.type && params.type !== 'all') {
          filteredStudies = filteredStudies.filter(study => study.project_type === params.type);
        }
        
        if (params?.featured) {
          filteredStudies = filteredStudies.filter(study => study.is_featured);
        }
        
        if (params?.limit) {
          filteredStudies = filteredStudies.slice(0, params.limit);
        }
        
        resolve({
          success: true,
          data: filteredStudies
        });
      }, 500); // Small delay to simulate API call
    });
  },

  getCaseStudy: async (slug: string): Promise<ApiResponse<CaseStudy>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const study = mockCaseStudies.find(s => s.slug === slug);
        if (study) {
          resolve({
            success: true,
            data: study
          });
        } else {
          resolve({
            success: false,
            data: {} as CaseStudy,
            message: 'Case study not found'
          });
        }
      }, 300);
    });
  },

  // Leads
  submitLead: async (lead: Lead): Promise<ApiResponse<any>> => {
    const response = await api.post('/v1/leads', lead);
    return response.data;
  },

  // Automation Scorecard
  submitAutomationScorecard: async (scorecard: AutomationScorecard & {
    name: string;
    email: string;
    company?: string;
  }): Promise<ApiResponse<any>> => {
    const response = await api.post('/v1/automation-scorecard', scorecard);
    return response.data;
  },

  // Public Metrics
  getPublicMetrics: async (): Promise<ApiResponse<{
    agents_deployed: number;
    workflows_active: number;
    hours_automated: number;
    roi_generated: number;
    projects_completed: number;
    clients_served: number;
  }>> => {
    const response = await api.get('/v1/metrics/summary');
    return response.data;
  },
};

export default api;