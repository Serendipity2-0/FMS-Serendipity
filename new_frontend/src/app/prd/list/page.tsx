/**
 * Page component for displaying the list of all PRDs
 */
import React from 'react';
import PRDList from '../../../components/PRDList';

export default function PRDListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Product Requirement Documents
        </h1>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <PRDList />
      </div>
    </div>
  );
}
