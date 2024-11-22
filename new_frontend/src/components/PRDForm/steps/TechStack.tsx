"use client";

/**
 * Tech Stack selection step component
 */
import React from 'react';
import { usePRD } from '@/context/PRDContext';
import { FrameworkOption, BackendFrameworkOption, DeploymentOption } from '@/types/prd';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const frontendFrameworks: FrameworkOption[] = [
  "NextJS", "React", "Vue", "Angular", "Svelte", "Ember", "Backbone", "Other"
];

const backendFrameworks: BackendFrameworkOption[] = [
  "FastAPI", "Django", "Flask", "Express", "Laravel", "Rails", "Other"
];

const deploymentOptions: DeploymentOption[] = [
  "Docker", "Kubernetes", "Other"
];

export default function TechStack() {
  const { state, dispatch } = usePRD();
  const { formData } = state;

  const techStack = formData.tech_stack || {
    domain: '',
    repo_name: '',
    frontend_framework: '',
    backend_framework: '',
    databases: [''],
    team_members: [''],
    deployment_option: '',
  };

  const updateTechStack = (field: string, value: string | string[]) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        tech_stack: {
          ...techStack,
          [field]: value,
        },
      },
    });
  };

  const addArrayItem = (field: 'databases' | 'team_members') => {
    const newArray = [...(techStack[field] || []), ''];
    updateTechStack(field, newArray);
  };

  const removeArrayItem = (field: 'databases' | 'team_members', index: number) => {
    const newArray = (techStack[field] || []).filter((_, i) => i !== index);
    updateTechStack(field, newArray);
  };

  const updateArrayItem = (field: 'databases' | 'team_members', index: number, value: string) => {
    const newArray = [...(techStack[field] || [])];
    newArray[index] = value;
    updateTechStack(field, newArray);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
        <p className="text-gray-600 mb-6">
          Define the technical specifications and team structure for your project.
        </p>
      </div>

      <div className="space-y-4">
        {/* Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domain *
          </label>
          <input
            type="text"
            value={techStack.domain}
            onChange={(e) => updateTechStack('domain', e.target.value)}
            placeholder="e.g., myapp.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Repository Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repository Name *
          </label>
          <input
            type="text"
            value={techStack.repo_name}
            onChange={(e) => updateTechStack('repo_name', e.target.value)}
            placeholder="e.g., my-awesome-project"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Frontend Framework */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frontend Framework *
          </label>
          <select
            value={techStack.frontend_framework}
            onChange={(e) => updateTechStack('frontend_framework', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Framework</option>
            {frontendFrameworks.map((framework) => (
              <option key={framework} value={framework}>
                {framework}
              </option>
            ))}
          </select>
          {techStack.frontend_framework === 'Other' && (
            <input
              type="text"
              value={techStack.custom_frontend_framework || ''}
              onChange={(e) => updateTechStack('custom_frontend_framework', e.target.value)}
              placeholder="Enter framework name"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>

        {/* Backend Framework */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Backend Framework *
          </label>
          <select
            value={techStack.backend_framework}
            onChange={(e) => updateTechStack('backend_framework', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Framework</option>
            {backendFrameworks.map((framework) => (
              <option key={framework} value={framework}>
                {framework}
              </option>
            ))}
          </select>
          {techStack.backend_framework === 'Other' && (
            <input
              type="text"
              value={techStack.custom_backend_framework || ''}
              onChange={(e) => updateTechStack('custom_backend_framework', e.target.value)}
              placeholder="Enter framework name"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>

        {/* Databases */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Databases *
          </label>
          {techStack.databases.map((database, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={database}
                onChange={(e) => updateArrayItem('databases', index, e.target.value)}
                placeholder="e.g., PostgreSQL"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => removeArrayItem('databases', index)}
                className="ml-2 p-2 text-red-600 hover:text-red-800"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem('databases')}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Add Database
          </button>
        </div>

        {/* Team Members */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Members *
          </label>
          {techStack.team_members.map((member, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={member}
                onChange={(e) => updateArrayItem('team_members', index, e.target.value)}
                placeholder="Enter team member name"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => removeArrayItem('team_members', index)}
                className="ml-2 p-2 text-red-600 hover:text-red-800"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem('team_members')}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Add Team Member
          </button>
        </div>

        {/* Deployment Option */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deployment Option *
          </label>
          <select
            value={techStack.deployment_option}
            onChange={(e) => updateTechStack('deployment_option', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Deployment Option</option>
            {deploymentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {techStack.deployment_option === 'Other' && (
            <input
              type="text"
              value={techStack.custom_deployment_option || ''}
              onChange={(e) => updateTechStack('custom_deployment_option', e.target.value)}
              placeholder="Enter deployment option"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>
      </div>
    </div>
  );
}
