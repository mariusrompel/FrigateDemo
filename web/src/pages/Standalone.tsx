import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import StandaloneSidebar from "@/components/navigation/StandaloneSidebar";
import ActivityIndicator from "@/components/indicators/activity-indicator";

const Live = lazy(() => import("@/pages/Live"));
const Events = lazy(() => import("@/pages/Events"));
const ConfigEditor = lazy(() => import("@/pages/ConfigEditor"));

export default function Standalone() {
  // Override document title to remove Frigate branding
  useEffect(() => {
    const updateTitle = () => {
      if (document.title.includes("Frigate")) {
        document.title = document.title
          .replace(" - Frigate", "")
          .replace("Frigate", "Camera View");
      }
    };

    updateTitle();

    const observer = new MutationObserver(updateTitle);
    const titleElement = document.querySelector("title");
    if (titleElement) {
      observer.observe(titleElement, { childList: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-primary">
      <StandaloneSidebar />
      <div className="relative flex-1 overflow-hidden">
        <Suspense
          fallback={
            <ActivityIndicator className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          }
        >
          <Routes>
            <Route index element={<Live />} />
            <Route path="review" element={<Events />} />
            <Route path="config" element={<ConfigEditor />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
