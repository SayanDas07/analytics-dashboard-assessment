import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subvalue?: string;
  icon?: string;
  color?: string;
  darkMode?: boolean;
}

export function StatCard({ title, value, subvalue, icon, color = "#4361ee", darkMode = false }: StatCardProps) {
  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg 
        ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3
            className={`text-sm font-medium 
              ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
          >
            {title}
          </h3>
          {icon && (
            <span
              className="text-2xl"
              style={{ color: darkMode ? `${color}cc` : color }} 
            >
              {icon}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <p
            className={`text-3xl font-bold 
              ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {value}
          </p>
          {subvalue && (
            <p
              className={`text-sm mt-1 
                ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {subvalue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}