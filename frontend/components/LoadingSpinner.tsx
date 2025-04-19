import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Loading dashboard data..." }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-middle"></div>
        <p className="mt-4 text-xl font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}