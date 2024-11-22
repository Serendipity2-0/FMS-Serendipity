"use client";

import { PRDProvider } from '@/context/PRDContext';
import PRDForm from '@/components/PRDForm';

export default function ClientPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PRD Assistant
          </h1>
          <p className="text-xl text-gray-600">
            Create detailed, step-by-step Product Requirements Documents with ease
          </p>
        </div>

        <PRDProvider>
          <PRDForm />
        </PRDProvider>
      </div>
    </main>
  );
}
