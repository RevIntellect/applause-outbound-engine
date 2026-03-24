"use client";

import type { Touchpoint, TouchpointChannel } from "@/lib/types";

const channelConfig: Record<
  TouchpointChannel,
  { icon: string; color: string }
> = {
  email: { icon: "mail", color: "bg-primary/15 text-primary" },
  linkedin: { icon: "share", color: "bg-secondary/15 text-secondary" },
  phone: { icon: "call", color: "bg-tertiary-container/30 text-tertiary" },
};

interface TouchpointTimelineProps {
  touchpoints: Touchpoint[];
  onAddTouchpoint?: () => void;
}

export default function TouchpointTimeline({
  touchpoints,
  onAddTouchpoint,
}: TouchpointTimelineProps) {
  return (
    <div className="space-y-0">
      {touchpoints.map((tp, i) => {
        const channel = channelConfig[tp.channel];
        return (
          <div key={tp.id} className="flex gap-4">
            {/* Timeline rail */}
            <div className="flex flex-col items-center">
              {/* Day badge */}
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 z-10">
                <span className="text-[0.6875rem] font-bold text-on-surface">
                  D{tp.day}
                </span>
              </div>
              {/* Connector */}
              {i < touchpoints.length - 1 && (
                <div className="w-0.5 flex-1 bg-surface-variant min-h-[1rem]" />
              )}
            </div>

            {/* Card */}
            <div className="flex-1 bg-surface-container-lowest rounded-lg p-5 shadow-ghost mb-3 hover:shadow-lift transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-md ${channel.color}`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 16 }}
                    >
                      {channel.icon}
                    </span>
                  </span>
                  <h3 className="text-sm font-semibold text-on-surface">
                    {tp.title}
                  </h3>
                </div>
                <span className="text-[0.6875rem] text-outline uppercase tracking-[0.05em]">
                  {tp.channel}
                </span>
              </div>
              <p className="text-[0.8125rem] text-on-surface-variant leading-relaxed mb-3">
                {tp.description}
              </p>
              {tp.metadata.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tp.metadata.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-surface-container text-[0.6875rem] font-medium text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Add touchpoint */}
      {onAddTouchpoint && (
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-outline"
                style={{ fontSize: 20 }}
              >
                add
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onAddTouchpoint}
            className="flex-1 rounded-lg py-4 text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors text-center"
            style={{ border: "1px dashed rgba(193, 198, 211, 0.3)" }}
          >
            Add New Touchpoint
          </button>
        </div>
      )}
    </div>
  );
}
