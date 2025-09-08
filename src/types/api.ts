export interface CaseStudy {
  id: number;
  title: string;
  client_name: string;
  client_industry?: string;
  project_type: string;
  is_featured: boolean;
  is_published: boolean;
  summary: string;
  problem_statement: string;
  solution_description: string;
  tech_stack: string[];
  automation_tools: string[];
  ai_models_used?: string[];
  implementation_details?: string;
  key_features: string[];
  metrics_before?: Record<string, any>;
  metrics_after: Record<string, any>;
  roi_data?: Record<string, any>;
  time_to_implementation_days?: number;
  project_value?: number;
  demo_url?: string;
  live_url?: string;
  images?: string[];
  testimonial?: {
    content: string;
    author: string;
    position: string;
  };
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  job_title?: string;
  company_size?: string;
  industry?: string;
  project_type?: string;
  message: string;
  services_interested?: string[];
  estimated_budget?: number;
  timeline?: string;
  automation_scorecard_data?: Record<string, any>;
}

export interface AutomationScorecard {
  current_processes: {
    manual_tasks_hours: number;
    repetitive_processes: string[];
    data_entry_frequency: string;
    approval_workflows: number;
  };
  pain_points: {
    biggest_challenges: string[];
    time_consuming_tasks: string[];
    error_prone_areas: string[];
    bottlenecks: string[];
  };
  automation_readiness: {
    current_tools: string[];
    tech_comfort_level: string;
    budget_range: string;
    timeline_preference: string;
  };
  desired_outcomes: {
    primary_goals: string[];
    success_metrics: string[];
    roi_expectations: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  };
}