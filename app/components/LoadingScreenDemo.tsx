"use client";

import { useState } from "react";
import { LoadingScreen } from "@/app/components/LoadingScreen";

/**
 * LoadingScreenDemo - Test component to preview the LoadingScreen
 * 
 * This component lets you toggle the loading screen on/off
 * Perfect for development and testing on localhost
 */
export const LoadingScreenDemo = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {/* Show loading screen when active */}
      {isLoading && (
        <div onClick={() => setIsLoading(false)}>
          <LoadingScreen />
        </div>
      )}

      {/* Demo button - only visible when not loading */}
      {!isLoading && (
        <div className="fixed bottom-6 right-6 z-[9998]">
          <button
            onClick={() => setIsLoading(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors shadow-lg"
          >
            Preview Loading Screen
          </button>
        </div>
      )}
    </>
  );
};

export default LoadingScreenDemo;
