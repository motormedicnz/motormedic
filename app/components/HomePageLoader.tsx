"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/app/components/LoadingScreen";

/**
 * HomePageLoader - Shows loading screen for 2.5 seconds on home page only
 * This component wraps the home page content and displays the premium
 * loading animation with traversing MOTORMEDIC text when the page first loads
 */
export const HomePageLoader = ({ children }: { children: React.ReactNode }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Show loader for 2.5 seconds on initial page load
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <LoadingScreen />}
      {!showLoader && children}
    </>
  );
};

export default HomePageLoader;
