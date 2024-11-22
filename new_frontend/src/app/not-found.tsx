/**
 * Custom 404 Not Found page
 */
import React from 'react';
import Link from 'next/link';

export default function NotFound(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
          moved or doesn&apos;t exist.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Return to Home
          </Link>
          <div className="text-gray-500">or</div>
          <Link
            href="/docs"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            View Documentation
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="mt-12 text-gray-400">
        <pre className="font-mono text-sm">
          {`
  {
    "error": 404,
    "message": "Page not found",
    "path": "${typeof window !== 'undefined' ? window.location.pathname : ''}"
  }
          `}
        </pre>
      </div>
    </main>
  );
}
