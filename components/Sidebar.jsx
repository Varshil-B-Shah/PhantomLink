// components/Sidebar.jsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BarChart2, Database, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    // Don't render sidebar on home page
    setShouldRender(pathname !== '/');
  }, [pathname]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!shouldRender) return null;

  // Navigation links data
  const navLinks = [
      { href: '/command', label: 'Command', icon: <Terminal size={20} /> },
      { href: '/user_data', label: 'User Data', icon: <Database size={20} /> },
      { href: '/metrics', label: 'Metrics', icon: <BarChart2 size={20} /> },
  ];

  return (
    <>
      {/* Sidebar Toggle Button - visible when sidebar is collapsed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-6 left-6 z-50 p-2 overflow-hidden rounded-full bg-black/30 backdrop-blur-md text-cyan-400 hover:text-cyan-300 transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {shouldRender && (
        <div
          style={{
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
          }}
          className={cn(
            "fixed top-0 left-0 h-screen overflow-hidden bg-gradient-to-br from-black/70 via-blue-900/60 to-cyan-900/50",
            "backdrop-blur-lg border-r border-cyan-500/20 shadow-lg z-40",
            "flex flex-col w-64 text-white p-4",
            "overflow-y-auto overflow-x-hidden"
          )}
        >
          {/* Sidebar Header with Toggle Button */}
          <div className="flex justify-between items-center mb-8 mt-2">
            <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Dashboard
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full bg-black/40 text-cyan-400 hover:text-cyan-300 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                  "hover:bg-white/10 group",
                  pathname === link.href 
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-l-2 border-cyan-400" 
                    : "opacity-80 hover:opacity-100"
                )}
              >
                <span className="text-cyan-400 group-hover:text-cyan-300">
                  {link.icon}
                </span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Decorative glowing element */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      )}
    </>
  );
};

export default Sidebar;