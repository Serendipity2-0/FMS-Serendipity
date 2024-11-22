"use client";

/**
 * Context for managing PRD form state across components
 */
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PRDData, ReferenceLink, TechStack, DatabaseSchema } from '../types/prd';

interface PRDState {
  currentStep: number;
  formData: Partial<PRDData>;
  isSubmitting: boolean;
  error: string | null;
}

type PRDAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<PRDData> }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_FORM' };

const initialState: PRDState = {
  currentStep: 1,
  formData: {},
  isSubmitting: false,
  error: null,
};

const PRDContext = createContext<{
  state: PRDState;
  dispatch: React.Dispatch<PRDAction>;
} | undefined>(undefined);

/**
 * Reducer function to handle state updates
 */
function prdReducer(state: PRDState, action: PRDAction): PRDState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

/**
 * Provider component for PRD context
 */
export function PRDProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(prdReducer, initialState);

  return (
    <PRDContext.Provider value={{ state, dispatch }}>
      {children}
    </PRDContext.Provider>
  );
}

/**
 * Custom hook to use PRD context
 */
export function usePRD() {
  const context = useContext(PRDContext);
  if (context === undefined) {
    throw new Error('usePRD must be used within a PRDProvider');
  }
  return context;
}

/**
 * Helper functions for form validation
 */
export const validateProjectInfo = (data: Partial<PRDData>): boolean => {
  return !!(data.project_name && data.vision);
};

export const validateReferenceLinks = (links: ReferenceLink[]): boolean => {
  return links.every(link => link.link && link.features.length > 0);
};

export const validateTechStack = (techStack: TechStack): boolean => {
  return !!(
    techStack.domain &&
    techStack.repo_name &&
    techStack.frontend_framework &&
    techStack.backend_framework &&
    techStack.databases.length > 0 &&
    techStack.team_members.length > 0 &&
    techStack.deployment_option
  );
};

export const validateDatabaseSchema = (schema: DatabaseSchema): boolean => {
  return schema.tables.length > 0 && schema.tables.every(table => 
    table.name && 
    table.fields.length > 0 && 
    table.fields.every(field => field.name && field.type)
  );
};

export const validateUserStories = (stories: string[]): boolean => {
  return stories.length > 0 && stories.every(story => story.trim().length > 0);
};
