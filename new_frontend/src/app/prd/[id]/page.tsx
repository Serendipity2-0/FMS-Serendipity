/**
 * Page component for displaying individual PRD details with interactive implementation tracking
 */
"use client";

import React, { useEffect, useState } from 'react';
import { PRDData } from '../../../types/prd';
import Link from 'next/link';
import PRDImplementation from '../../../components/PRDImplementation';

interface PRDWithId extends PRDData {
  id: string;
}

export default function PRDDetails({ params }: { params: { id: string } }) {
  const [prd, setPRD] = useState<PRDWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'implementation'>('overview');

  useEffect(() => {
    const fetchPRD = async () => {
      try {
        const response = await fetch(`/api/prds/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch PRD');
        }
        const data = await response.json();
        setPRD(data);
      } catch (err) {
        console.error('Error fetching PRD:', err);
        setError('Failed to load PRD details');
      } finally {
        setLoading(false);
      }
    };

    fetchPRD();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !prd) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-error p-4">
          {error || 'PRD not found'}
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="text-primary hover:text-primary-hover">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-primary hover:text-primary-hover">
          ← Back to Home
        </Link>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-primary text-white'
                : 'text-secondary hover:text-primary'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('implementation')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'implementation'
                ? 'bg-primary text-white'
                : 'text-secondary hover:text-primary'
            }`}
          >
            Implementation Guide
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-primary">{prd.project_name}</h1>
          
          {activeTab === 'overview' ? (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2 text-primary">Vision</h2>
                <p className="text-secondary">{prd.vision}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-primary">Tech Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="font-medium text-primary mb-2">Frontend</p>
                    <p className="text-secondary">{prd.tech_stack.frontend_framework}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="font-medium text-primary mb-2">Backend</p>
                    <p className="text-secondary">{prd.tech_stack.backend_framework}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="font-medium text-primary mb-2">Databases</p>
                    <p className="text-secondary">{prd.tech_stack.databases.join(', ')}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="font-medium text-primary mb-2">Deployment</p>
                    <p className="text-secondary">{prd.tech_stack.deployment_option}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2 text-primary">User Stories</h2>
                <ul className="space-y-2">
                  {prd.user_stories.map((story, index) => (
                    <li key={index} className="text-secondary bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {story}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-primary">Database Schema</h2>
                {prd.database_schema.tables.map((table) => (
                  <div key={table.name} className="mb-6">
                    <h3 className="font-medium text-lg mb-3 text-primary">{table.name}</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border dark:border-gray-700 rounded-lg">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-700">
                            <th className="px-4 py-2 border dark:border-gray-600 text-left text-primary">Field</th>
                            <th className="px-4 py-2 border dark:border-gray-600 text-left text-primary">Type</th>
                            <th className="px-4 py-2 border dark:border-gray-600 text-left text-primary">Required</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.fields.map((field) => (
                            <tr key={field.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-4 py-2 border dark:border-gray-600 text-secondary">{field.name}</td>
                              <td className="px-4 py-2 border dark:border-gray-600 text-secondary">{field.type}</td>
                              <td className="px-4 py-2 border dark:border-gray-600 text-secondary">
                                {field.required ? 'Yes' : 'No'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-primary">Reference Links</h2>
                {prd.reference_links.map((ref, index) => (
                  <div key={index} className="mb-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <a
                      href={ref.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover"
                    >
                      {ref.link}
                    </a>
                    <ul className="list-disc pl-6 mt-2">
                      {ref.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-secondary">{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <PRDImplementation prd={prd} />
          )}
        </div>
      </div>
    </div>
  );
}
