/**
 * PRDChecklist Component
 * Displays an interactive checklist of implementation steps for a PRD
 */
import React, { useState } from 'react';
import { PRDData } from '../../types/prd';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  steps: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  expanded: boolean;
}

interface PRDChecklistProps {
  prd: PRDData;
}

export const PRDChecklist: React.FC<PRDChecklistProps> = ({ prd }) => {
  const generateInitialChecklist = (): ChecklistItem[] => {
    return [
      {
        id: 'setup',
        title: 'Initial Setup',
        description: 'Set up the project repository and development environment',
        steps: [
          {
            id: 'repo',
            text: `Create a new GitHub repository named "${prd.tech_stack.repo_name}"`,
            completed: false
          },
          {
            id: 'clone',
            text: 'Clone the repository to your local machine',
            completed: false
          },
          {
            id: 'readme',
            text: 'Create README.md with project description and setup instructions',
            completed: false
          }
        ],
        expanded: true
      },
      {
        id: 'frontend',
        title: 'Frontend Setup',
        description: `Set up ${prd.tech_stack.frontend_framework} project`,
        steps: [
          {
            id: 'frontend-init',
            text: `Create new ${prd.tech_stack.frontend_framework} project`,
            completed: false
          },
          {
            id: 'frontend-deps',
            text: 'Install required dependencies',
            completed: false
          },
          {
            id: 'frontend-structure',
            text: 'Set up project structure and routing',
            completed: false
          }
        ],
        expanded: false
      },
      {
        id: 'backend',
        title: 'Backend Setup',
        description: `Set up ${prd.tech_stack.backend_framework} project`,
        steps: [
          {
            id: 'backend-init',
            text: `Initialize ${prd.tech_stack.backend_framework} project`,
            completed: false
          },
          {
            id: 'backend-deps',
            text: 'Install required dependencies',
            completed: false
          },
          {
            id: 'backend-structure',
            text: 'Set up project structure and API endpoints',
            completed: false
          }
        ],
        expanded: false
      },
      {
        id: 'database',
        title: 'Database Setup',
        description: `Set up ${prd.tech_stack.databases.join(' and ')}`,
        steps: prd.tech_stack.databases.flatMap(db => [
          {
            id: `${db.toLowerCase()}-setup`,
            text: `Set up ${db} database`,
            completed: false
          },
          {
            id: `${db.toLowerCase()}-schema`,
            text: `Create database schema for ${db}`,
            completed: false
          }
        ]),
        expanded: false
      },
      {
        id: 'deployment',
        title: 'Deployment Setup',
        description: `Set up ${prd.tech_stack.deployment_option} deployment`,
        steps: [
          {
            id: 'docker-setup',
            text: 'Create Dockerfile and docker-compose.yml',
            completed: false
          },
          {
            id: 'ci-cd',
            text: 'Set up CI/CD pipeline',
            completed: false
          },
          {
            id: 'deployment-docs',
            text: 'Document deployment process',
            completed: false
          }
        ],
        expanded: false
      }
    ];
  };

  const [checklist, setChecklist] = useState<ChecklistItem[]>(generateInitialChecklist());

  const toggleStep = (sectionId: string, stepId: string) => {
    setChecklist(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          steps: section.steps.map(step => 
            step.id === stepId ? { ...step, completed: !step.completed } : step
          )
        };
      }
      return section;
    }));
  };

  const toggleSection = (sectionId: string) => {
    setChecklist(prev => prev.map(section => 
      section.id === sectionId ? { ...section, expanded: !section.expanded } : section
    ));
  };

  const getSectionProgress = (section: ChecklistItem) => {
    const completed = section.steps.filter(step => step.completed).length;
    const total = section.steps.length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Implementation Checklist</h2>
      
      {checklist.map(section => (
        <div key={section.id} className="border rounded-lg shadow-sm bg-white dark:bg-gray-800">
          <div 
            className="p-4 cursor-pointer flex items-center justify-between"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary">{section.title}</h3>
              <p className="text-secondary text-sm mt-1">{section.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted">
                {getSectionProgress(section)}% complete
              </span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  section.expanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          
          {section.expanded && (
            <div className="border-t p-4">
              <div className="space-y-3">
                {section.steps.map(step => (
                  <div
                    key={step.id}
                    className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={step.completed}
                      onChange={() => toggleStep(section.id, step.id)}
                      className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className={`text-sm ${
                      step.completed ? 'text-muted line-through' : 'text-primary'
                    }`}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PRDChecklist;
