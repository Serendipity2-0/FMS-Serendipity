/**
 * Documentation page component
 */
import Link from 'next/link';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PRD Assistant Documentation
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to create effective Product Requirements Documents
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Navigation */}
          <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-6 text-gray-300">
              <li>
                <Link href="#getting-started" className="hover:text-white">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="#step-by-step" className="hover:text-white">
                  Step by Step Guide
                </Link>
              </li>
              <li>
                <Link href="#best-practices" className="hover:text-white">
                  Best Practices
                </Link>
              </li>
            </ul>
          </nav>

          {/* Content */}
          <div className="p-8 space-y-12">
            {/* Getting Started */}
            <section id="getting-started">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Started</h2>
              <div className="prose max-w-none">
                <p>
                  The PRD Assistant helps you create comprehensive Product Requirements Documents
                  through a guided, step-by-step process. Each step focuses on a specific aspect
                  of your project, ensuring that all important details are captured.
                </p>
                <h3>Key Features</h3>
                <ul>
                  <li>Step-by-step guided process</li>
                  <li>Real-time validation</li>
                  <li>Reference management</li>
                  <li>Tech stack configuration</li>
                  <li>Database schema design</li>
                  <li>User story creation</li>
                </ul>
              </div>
            </section>

            {/* Step by Step Guide */}
            <section id="step-by-step">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Step by Step Guide</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    1. Project Information
                  </h3>
                  <p className="text-gray-600">
                    Start by providing basic information about your project, including its name
                    and vision statement. The vision statement should clearly articulate what
                    the project aims to achieve.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    2. Reference Links
                  </h3>
                  <p className="text-gray-600">
                    Add links to similar products or inspirational references. For each reference,
                    list specific features that are relevant to your project. This helps in
                    understanding the competitive landscape and feature expectations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    3. Tech Stack
                  </h3>
                  <p className="text-gray-600">
                    Define your technical infrastructure by selecting frameworks, databases,
                    and deployment options. Also, assign team members to the project and
                    specify the project&apos;s domain details.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    4. Database Schema
                  </h3>
                  <p className="text-gray-600">
                    Design your database structure by defining tables, fields, and relationships.
                    Each table should have clear field definitions including types and constraints.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    5. User Stories
                  </h3>
                  <p className="text-gray-600">
                    Create user stories that describe the functionality from an end-user&apos;s
                    perspective. Follow the format: &quot;As a [type of user], I want [goal]
                    so that [benefit].&quot;
                  </p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Writing Vision Statements
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Keep it clear and concise</li>
                    <li>Focus on the core problem being solved</li>
                    <li>Include the target audience</li>
                    <li>Highlight key differentiators</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Creating User Stories
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Use the standard format</li>
                    <li>Focus on user value</li>
                    <li>Keep stories atomic</li>
                    <li>Include acceptance criteria</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Database Design
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Follow normalization principles</li>
                    <li>Use clear naming conventions</li>
                    <li>Define relationships explicitly</li>
                    <li>Include field constraints</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Tech Stack Selection
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Consider team expertise</li>
                    <li>Evaluate scalability needs</li>
                    <li>Account for maintenance</li>
                    <li>Check community support</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Back to App Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to PRD Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}
