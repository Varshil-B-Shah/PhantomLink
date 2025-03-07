"use client";

import { UserButton, useUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
import { useSidebar } from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function DashboardLayout({ children }) {
  const { isCollapsed } = useSidebar();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Wait until the user data is loaded to avoid hydration mismatches.
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  // If the user is not authenticated, redirect them.
  if (!user) {
    return null;
  }

  return (
    <div
      className={` bg-black flex min-h-screen ${
        isCollapsed ? "ml-0" : "ml-64"
      }`}
    >
      {/* UserButton positioned at the top right */}
      <div className="absolute top-8 right-7 z-100">
        <div className="relative group">
          {/* Enhanced cyan glow effect */}
          <div className="absolute -inset-4 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300"></div>

          {/* Much bigger UserButton */}
          <div
            className="clerk-user-button-wrapper"
            style={{ transform: "scale(1.5)" }}
          >
            <UserButton afterSignOutUrl="/com" />
          </div>
        </div>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
