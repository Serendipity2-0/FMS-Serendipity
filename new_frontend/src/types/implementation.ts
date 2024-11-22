/**
 * Types for PRD implementation tracking
 */

export type ImplementationStatus = 'not_started' | 'in_progress' | 'completed';

export interface SubTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  proof?: {
    type: 'screenshot' | 'link';
    content: string;
    timestamp: string;
  };
}

export interface ImplementationStage {
  id: string;
  title: string;
  description: string;
  status: ImplementationStatus;
  subTasks: SubTask[];
  proof?: {
    type: 'screenshot' | 'link';
    content: string;
    timestamp: string;
  };
}

export interface PRDImplementation {
  prdId: string;
  projectName: string;
  lastUpdated: string;
  stages: ImplementationStage[];
}
