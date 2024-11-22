"use client";

/**
 * Project Information step component
 */
import React from 'react';
import { usePRD } from '@/context/PRDContext';

export default function ProjectInfo() {
  const { state, dispatch } = usePRD();
  const { formData } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        [name]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Project Information</h2>
        <p className="text-gray-600 mb-6">
          Let&apos;s start with the basic information about your project.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label 
            htmlFor="project_name" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Name *
          </label>
          <input
            type="text"
            id="project_name"
            name="project_name"
            value={formData.project_name || ''}
            onChange={handleChange}
            placeholder="Enter project name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Choose a clear and descriptive name for your project
          </p>
        </div>

        <div>
          <label 
            htmlFor="vision" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Vision *
          </label>
          <textarea
            id="vision"
            name="vision"
            value={formData.vision || ''}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your project vision"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Provide a clear vision statement that describes the purpose and goals of your project
          </p>
        </div>
      </div>

      {/* Validation Message */}
      {(!formData.project_name || !formData.vision) && (
        <div className="mt-4 text-sm text-yellow-600">
          * Both Project Name and Vision are required to proceed
        </div>
      )}
    </div>
  );
}
