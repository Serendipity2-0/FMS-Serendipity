"use client";

/**
 * Error page component for handling runtime errors
 */
import React from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps): React.JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-red-600 mb-4">Error</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Something went wrong!</h1>
        <p className="text-gray-600 mb-8">
          {error.message || 'An unexpected error occurred. Please try again later.'}
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
          <div className="text-gray-500">or</div>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Return to Home
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="mt-12 text-gray-400">
        <pre className="font-mono text-sm overflow-auto max-w-full p-4">
          {`
  {
    "error": "${error.name}",
    "message": "${error.message}",
    "stack": ${process.env.NODE_ENV === 'development' ? 
      JSON.stringify(error.stack, null, 2) : 
      '"Stack trace only available in development mode"'
    }
  }
          `}
        </pre>
      </div>
    </main>
  );
}
