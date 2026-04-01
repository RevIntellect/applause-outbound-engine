"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const stageTabPattern = /^\/campaigns\/[^/]+\/(research|enrichment|sequencing|execution|export)/;

const stageTabs = [
  { label: "Research", slug: "research" },
  { label: "Enrichment", slug: "enrichment" },
  { label: "Sequencing", slug: "sequencing" },
  { label: "Execution", slug: "execution" },
];

export default function TopNav() {
  const pathname = usePathname();

  const stageMatch = pathname.match(stageTabPattern);
  const activeStage = stageMatch ? stageMatch[1] : null;
  const campaignBase = pathname.match(/^\/campaigns\/([^/]+)/)?.[0];

  return (
    <header className="h-14 bg-surface-container-lowest flex items-center justify-between px-6 shadow-ghost">
      {/* Stage tabs (only visible inside a campaign) */}
      <div className="flex items-center gap-1">
        {campaignBase ? (
          stageTabs.map((tab) => (
            <Link
              key={tab.slug}
              href={`${campaignBase}/${tab.slug}`}
              className={`px-4 py-1.5 text-xs font-semibold tracking-[0.05em] uppercase rounded-md transition-colors ${
                activeStage === tab.slug
                  ? "text-primary bg-surface-container-high"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              {tab.label}
            </Link>
          ))
        ) : (
          <div />
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-lg">
          <span className="material-symbols-outlined text-outline" style={{ fontSize: 18 }}>
            search
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-on-surface placeholder:text-outline outline-none w-40"
          />
        </div>

        {/* Icons */}
        <button
          type="button"
          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            notifications
          </span>
        </button>
        <button
          type="button"
          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
          aria-label="Settings"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            settings
          </span>
        </button>
      </div>
    </header>
  );
}
