/**
 * PRDImplementation Component
 * Displays implementation stages with status indicators and proof submission
 */
import React, { useState, useEffect } from 'react';
import { PRDData } from '../../types/prd';
import { PRDImplementation, ImplementationStage, ImplementationStatus } from '../../types/implementation';

interface PRDImplementationProps {
  prd: PRDData;
}

const PRDImplementationComponent: React.FC<PRDImplementationProps> = ({ prd }) => {
  const [implementation, setImplementation] = useState<PRDImplementation | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [proofInput, setProofInput] = useState<string>('');
  const [proofType, setProofType] = useState<'screenshot' | 'link'>('link');

  useEffect(() => {
    // Load implementation data from JSON file
    const loadImplementation = async () => {
      try {
        const response = await fetch(`/api/implementations/${prd.id}`);
        if (response.ok) {
          const data = await response.json();
          setImplementation(data);
        } else {
          // Initialize new implementation if none exists
          const newImplementation = generateInitialImplementation(prd);
          setImplementation(newImplementation);
          // Save the new implementation
          await saveImplementation(newImplementation);
        }
      } catch (error) {
        console.error('Error loading implementation:', error);
      }
    };

    loadImplementation();
  }, [prd]);

  const generateInitialImplementation = (prd: PRDData): PRDImplementation => {
    return {
      prdId: prd.id,
      projectName: prd.project_name,
      lastUpdated: new Date().toISOString(),
      stages: [
        {
          id: 'initial-setup',
          title: 'Initial Setup',
          description: 'Set up the project repository and development environment',
          status: 'not_started',
          subTasks: [
            {
              id: 'create-repo',
              title: `Create GitHub Repository: ${prd.tech_stack.repo_name}`,
              description: 'Create a new repository on GitHub with the specified name',
              completed: false
            },
            {
              id: 'clone-repo',
              title: 'Clone Repository',
              description: 'Clone the repository to your local development environment',
              completed: false
            },
            {
              id: 'setup-readme',
              title: 'Initialize README',
              description: 'Create and populate README.md with project information',
              completed: false
            }
          ]
        },
        {
          id: 'frontend-setup',
          title: 'Frontend Setup',
          description: `Set up ${prd.tech_stack.frontend_framework} project`,
          status: 'not_started',
          subTasks: [
            {
              id: 'create-frontend',
              title: `Initialize ${prd.tech_stack.frontend_framework} Project`,
              description: 'Create a new frontend project with the specified framework',
              completed: false
            },
            {
              id: 'setup-dependencies',
              title: 'Install Dependencies',
              description: 'Install and configure required dependencies',
              completed: false
            },
            {
              id: 'setup-structure',
              title: 'Project Structure',
              description: 'Set up project directory structure and base configuration',
              completed: false
            }
          ]
        },
        {
          id: 'backend-setup',
          title: 'Backend Setup',
          description: `Set up ${prd.tech_stack.backend_framework} project`,
          status: 'not_started',
          subTasks: [
            {
              id: 'create-backend',
              title: `Initialize ${prd.tech_stack.backend_framework} Project`,
              description: 'Create a new backend project with the specified framework',
              completed: false
            },
            {
              id: 'setup-api',
              title: 'Setup API Structure',
              description: 'Create basic API structure and endpoints',
              completed: false
            },
            {
              id: 'setup-middleware',
              title: 'Configure Middleware',
              description: 'Set up necessary middleware and configurations',
              completed: false
            }
          ]
        },
        {
          id: 'database-setup',
          title: 'Database Setup',
          description: `Set up ${prd.tech_stack.databases.join(' and ')}`,
          status: 'not_started',
          subTasks: prd.tech_stack.databases.flatMap(db => [
            {
              id: `setup-${db.toLowerCase()}`,
              title: `Setup ${db}`,
              description: `Initialize and configure ${db} database`,
              completed: false
            },
            {
              id: `${db.toLowerCase()}-schema`,
              title: `Create ${db} Schema`,
              description: 'Create and configure database schema',
              completed: false
            }
          ])
        },
        {
          id: 'deployment-setup',
          title: 'Deployment Setup',
          description: `Configure ${prd.tech_stack.deployment_option} deployment`,
          status: 'not_started',
          subTasks: [
            {
              id: 'create-dockerfile',
              title: 'Create Dockerfile',
              description: 'Create and configure Dockerfile',
              completed: false
            },
            {
              id: 'setup-compose',
              title: 'Setup Docker Compose',
              description: 'Create and configure docker-compose.yml',
              completed: false
            },
            {
              id: 'setup-cicd',
              title: 'Configure CI/CD',
              description: 'Set up continuous integration and deployment pipeline',
              completed: false
            }
          ]
        }
      ]
    };
  };

  const saveImplementation = async (impl: PRDImplementation) => {
    try {
      await fetch(`/api/implementations/${prd.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(impl),
      });
    } catch (error) {
      console.error('Error saving implementation:', error);
    }
  };

  const getStageStatus = (stage: ImplementationStage): ImplementationStatus => {
    const completedTasks = stage.subTasks.filter(task => task.completed).length;
    const totalTasks = stage.subTasks.length;
    
    if (completedTasks === 0) return 'not_started';
    if (completedTasks === totalTasks) return 'completed';
    return 'in_progress';
  };

  const getStatusColor = (status: ImplementationStatus): string => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-orange-500';
      case 'not_started': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleSubTask = async (stageId: string, taskId: string) => {
    if (!implementation) return;

    const updatedImplementation = {
      ...implementation,
      stages: implementation.stages.map(stage => {
        if (stage.id === stageId) {
          return {
            ...stage,
            subTasks: stage.subTasks.map(task => {
              if (task.id === taskId) {
                return { ...task, completed: !task.completed };
              }
              return task;
            }),
          };
        }
        return stage;
      }),
      lastUpdated: new Date().toISOString(),
    };

    // Update status for the stage
    updatedImplementation.stages = updatedImplementation.stages.map(stage => ({
      ...stage,
      status: getStageStatus(stage),
    }));

    setImplementation(updatedImplementation);
    await saveImplementation(updatedImplementation);
  };

  const submitProof = async (stageId: string) => {
    if (!implementation || !proofInput) return;

    const updatedImplementation = {
      ...implementation,
      stages: implementation.stages.map(stage => {
        if (stage.id === stageId) {
          return {
            ...stage,
            proof: {
              type: proofType,
              content: proofInput,
              timestamp: new Date().toISOString(),
            },
          };
        }
        return stage;
      }),
      lastUpdated: new Date().toISOString(),
    };

    setImplementation(updatedImplementation);
    await saveImplementation(updatedImplementation);
    setProofInput('');
    setSelectedStage(null);
  };

  if (!implementation) {
    return <div className="flex justify-center items-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Implementation Progress</h2>
      
      {implementation.stages.map(stage => (
        <div key={stage.id} className="border rounded-lg shadow-sm bg-white dark:bg-gray-800">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(stage.status)}`} />
                <h3 className="text-lg font-semibold text-primary">{stage.title}</h3>
              </div>
              <span className="text-sm text-muted">
                {stage.subTasks.filter(t => t.completed).length} / {stage.subTasks.length} tasks completed
              </span>
            </div>

            <p className="text-secondary text-sm mb-4">{stage.description}</p>

            <div className="space-y-3">
              {stage.subTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleSubTask(stage.id, task.id)}
                    className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div>
                    <span className={`text-sm ${
                      task.completed ? 'text-muted line-through' : 'text-primary'
                    }`}>
                      {task.title}
                    </span>
                    <p className="text-xs text-muted mt-1">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {stage.proof ? (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm font-medium text-primary">Proof of Completion</p>
                {stage.proof.type === 'link' ? (
                  <a
                    href={stage.proof.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {stage.proof.content}
                  </a>
                ) : (
                  <img
                    src={stage.proof.content}
                    alt="Proof"
                    className="mt-2 max-w-full h-auto rounded"
                  />
                )}
                <p className="text-xs text-muted mt-1">
                  Submitted on {new Date(stage.proof.timestamp).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <button
                onClick={() => setSelectedStage(stage.id)}
                className="mt-4 text-sm text-primary hover:text-primary-hover"
              >
                + Add proof of completion
              </button>
            )}

            {selectedStage === stage.id && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setProofType('link')}
                    className={`px-3 py-1 rounded ${
                      proofType === 'link'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Link
                  </button>
                  <button
                    onClick={() => setProofType('screenshot')}
                    className={`px-3 py-1 rounded ${
                      proofType === 'screenshot'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Screenshot
                  </button>
                </div>
                
                {proofType === 'link' ? (
                  <input
                    type="text"
                    value={proofInput}
                    onChange={(e) => setProofInput(e.target.value)}
                    placeholder="Enter URL"
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProofInput(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-2"
                  />
                )}

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => {
                      setSelectedStage(null);
                      setProofInput('');
                    }}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => submitProof(stage.id)}
                    className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-hover"
                    disabled={!proofInput}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PRDImplementationComponent;
