/**
 * Types for PRD (Product Requirements Document) data structures
 */

export interface ReferenceLink {
  link: string;
  features: string[];
}

export interface TechStack {
  domain: string;
  repo_name: string;
  frontend_framework: string;
  custom_frontend_framework?: string;
  backend_framework: string;
  custom_backend_framework?: string;
  databases: string[];
  team_members: string[];
  deployment_option: string;
  custom_deployment_option?: string;
}

export interface DatabaseField {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface DatabaseTable {
  name: string;
  fields: DatabaseField[];
  relationships: Array<{
    table: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }>;
}

export interface DatabaseSchema {
  tables: DatabaseTable[];
}

export interface PRDData {
  id: string;
  project_name: string;
  vision: string;
  reference_links: ReferenceLink[];
  tech_stack: TechStack;
  database_schema: DatabaseSchema;
  user_stories: string[];
}

export type FrameworkOption = 
  | "NextJS" 
  | "React" 
  | "Vue" 
  | "Angular" 
  | "Svelte" 
  | "Ember" 
  | "Backbone" 
  | "Other";

export type BackendFrameworkOption = 
  | "FastAPI" 
  | "Django" 
  | "Flask" 
  | "Express" 
  | "Laravel" 
  | "Rails" 
  | "Other";

export type DeploymentOption = 
  | "Docker" 
  | "Kubernetes" 
  | "Other";
