"use client";

import { useSidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`bg-black flex min-h-screen ${isCollapsed ? "ml-0" : "ml-64"}`}
    >
      {children}
    </div>
  );
}
