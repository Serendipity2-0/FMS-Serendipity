"use client";

import { Inter } from "next/font/google";
import { ToastContainer } from "../components/Toast";
import Link from "next/link";
import { useState } from "react";
import { BsFillMoonFill } from "react-icons/bs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <html lang="en" className={`${theme} h-full`}>
      <body
        className={`${inter.className} min-h-full ${theme === "light" ? "bg-gray-50 text-black" : "bg-black text-white"
          }`}
      >
        {/* Navigation Header */}
        <header
          className={`${theme === "light" ? "bg-white" : "bg-gray-800"
            } shadow-sm`}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold">
              PRD Assistant
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle theme"
              >
                <BsFillMoonFill size={20} />
              </button>
              <Link
                href="/prd/list"
                className={`${theme === "light" ? "text-gray-600" : "text-gray-300"
                  } hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium`}
              >
                View PRDs
              </Link>
              <Link
                href="/"
                className={`${theme === "light"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 text-black hover:bg-blue-600"
                  } px-4 py-2 rounded-md text-sm font-medium`}
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
        <footer
          className={`${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
            }`}
        >
          <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <p className={`${theme === "light" ? "text-gray-500" : "text-gray-400"} text-sm`}>
              PRD Assistant - Create better product documentation
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme === "light" ? "text-gray-400 hover:text-gray-500" : "text-gray-300 hover:text-gray-400"
                  }`}
              >
                GitHub
              </a>
              <Link
                href="/docs"
                className={`${theme === "light" ? "text-gray-400 hover:text-gray-500" : "text-gray-300 hover:text-gray-400"
                  }`}
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
