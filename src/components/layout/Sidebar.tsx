"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/" },
  { label: "Leads", icon: "people", href: "/leads" },
  { label: "Campaigns", icon: "campaign", href: "/campaigns" },
  { label: "Analytics", icon: "analytics", href: "/analytics" },
];

const bottomItems = [
  { label: "Settings", icon: "settings", href: "/settings" },
  { label: "Support", icon: "help", href: "/support" },
];

export default function Sidebar() {
  const pathname = usePathname();

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
        {/* New Campaign CTA */}
        <Link
          href="/campaigns/new"
          className="flex items-center justify-center gap-2 mx-1 mb-4 px-4 py-2.5 rounded-lg text-sm font-semibold text-on-primary transition-transform hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            add_circle
          </span>
          New Campaign
        </Link>

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

        {/* User avatar */}
        <div className="flex items-center gap-3 px-4 py-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
            <span className="text-on-primary text-xs font-bold">AW</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-inverse-on-surface text-sm font-medium truncate">
              Aaron Wolf
            </div>
            <div className="text-inverse-on-surface/50 text-[0.6875rem] truncate">
              Sr. Manager, Sales
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
