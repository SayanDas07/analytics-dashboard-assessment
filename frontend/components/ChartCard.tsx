import React from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  darkMode?: boolean;
}

export function ChartCard({ title, subtitle, children, darkMode = false }: ChartCardProps) {
  return (
    <div
      className={`rounded-lg shadow-md p-6 transition-all hover:shadow-lg
        ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
    >
      <div className="mb-4">
        <h2
          className={`text-xl font-semibold
            ${darkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-sm
              ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}