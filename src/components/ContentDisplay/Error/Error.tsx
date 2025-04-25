import React from 'react';
import { UI_ERRORS } from "@/constants/errors";

/**
 * Displays an error message when connection fails with a retry button
 */
export const Error: React.FC = () => (
  <section className="grow flex flex-col items-center justify-center border rounded-lg p-4 bg-gray-50">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <p className="mt-4 text-gray-700 font-medium">{UI_ERRORS.CONNECTION_UNAVAILABLE}</p>
    <p className="mt-2 text-gray-500 text-center max-w-md">
      {UI_ERRORS.RETRY_SUGGESTION}
    </p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      {UI_ERRORS.RETRY_OPERATION}
    </button>
  </section>
); 