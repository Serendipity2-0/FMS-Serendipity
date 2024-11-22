import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "../components/Toast";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PRD Assistant - Create Product Requirements Documents",
  description: "A step-by-step tool for creating detailed Product Requirements Documents (PRDs) for your tech projects.",
  keywords: [
    "PRD",
    "Product Requirements Document",
    "Project Management",
    "Technical Documentation",
    "Software Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-gray-50`}>
        {/* Navigation Header */}
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-gray-900">
              PRD Assistant
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/prd/list"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                View PRDs
              </Link>
              <Link
                href="/"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Create New PRD
              </Link>
            </div>
          </nav>
        </header>

        {/* Toast Container for Notifications */}
        <ToastContainer />
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              PRD Assistant - Create better product documentation
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                GitHub
              </a>
              <Link
                href="/docs"
                className="text-gray-400 hover:text-gray-500"
              >
                Documentation
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
