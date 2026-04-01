"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Process Overview", icon: "dashboard", href: "/" },
  { label: "New Request", icon: "add_circle", href: "/intake" },
  { label: "Skills", icon: "psychology", href: "/skills" },
  { label: "Outputs", icon: "description", href: "/outputs" },
  { label: "Analytics", icon: "analytics", href: "/analytics" },
];

const bottomItems = [
  { label: "Settings", icon: "settings", href: "/settings" },
  { label: "Support", icon: "help", href: "/support" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("applause-theme") as "light" | "dark" | null;
    const initial = stored || "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("applause-theme", next);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-inverse-surface flex flex-col z-30">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary" style={{ fontSize: 18 }}>
              rocket_launch
            </span>
          </div>
          <div>
            <div className="text-inverse-on-surface font-bold text-sm tracking-wide">
              APPLAUSE
            </div>
            <div className="text-inverse-primary text-[0.6875rem] font-medium tracking-[0.05em] uppercase">
              Outbound Engine
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-primary-container text-on-primary"
                : "text-inverse-on-surface/70 hover:text-inverse-on-surface hover:bg-inverse-on-surface/5"
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-inverse-on-surface/60 hover:text-inverse-on-surface hover:bg-inverse-on-surface/5 transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-inverse-on-surface/60 hover:text-inverse-on-surface hover:bg-inverse-on-surface/5 transition-colors w-full"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            {theme === "light" ? "dark_mode" : "light_mode"}
          </span>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

      </div>
    </aside>
  );
}
