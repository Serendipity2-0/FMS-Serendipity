/**
 * Component for displaying a list of saved PRDs
 */
"use client";

import React, { useEffect, useState } from 'react';
import { PRDData } from '../../types/prd';
import Link from 'next/link';

interface PRDWithId extends PRDData {
  id: string;
}

export default function PRDList() {
  const [prds, setPRDs] = useState<PRDWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPRDs = async () => {
      try {
        const response = await fetch('/api/prds');
        if (!response.ok) {
          throw new Error('Failed to fetch PRDs');
        }
        const data = await response.json();
        setPRDs(data);
      } catch (err) {
        console.error('Error fetching PRDs:', err);
        setError('Failed to load PRDs');
      } finally {
        setLoading(false);
      }
    };

    fetchPRDs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  if (prds.length === 0) {
    return (
      <div className="text-center text-gray-600 p-4">
        No PRDs found. Create your first PRD to get started!
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {prds.map((prd) => (
        <div
          key={prd.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{prd.project_name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{prd.vision}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              {prd.tech_stack.frontend_framework}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
              {prd.tech_stack.backend_framework}
            </span>
          </div>
          <Link
            href={`/prd/${prd.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
