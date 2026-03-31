"use client";

import { useState } from "react";
import StreamingAvatarPlayer from "@/components/avatar/StreamingAvatarPlayer";

export default function AvatarPage() {
  const [avatarName, setAvatarName] = useState("default");

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">
          Interactive Avatar
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          AI-powered streaming avatar for conversational outreach coaching and demo walkthroughs.
        </p>
      </div>

      {/* Avatar config */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider mb-2">
          Avatar ID
        </label>
        <input
          type="text"
          value={avatarName}
          onChange={(e) => setAvatarName(e.target.value)}
          placeholder="Enter HeyGen avatar ID (e.g. josh_lite3_20230714)"
          className="w-full max-w-md px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-on-surface-variant/50"
        />
        <p className="mt-1.5 text-xs text-on-surface-variant/60">
          Browse avatars at labs.heygen.com/interactive-avatar
        </p>
      </div>

      {/* Player */}
      <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
        <StreamingAvatarPlayer avatarName={avatarName} />
      </div>

      {/* Info cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>
              text_fields
            </span>
            <h3 className="text-sm font-semibold text-on-surface">Text Mode</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Type messages and the avatar will speak them aloud. Good for scripted demos and rehearsed pitches.
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>
              voice_chat
            </span>
            <h3 className="text-sm font-semibold text-on-surface">Voice Chat</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Have a real-time conversation with the avatar. Uses speech-to-text to capture your voice input.
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-lg p-5 shadow-ghost">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>
              tune
            </span>
            <h3 className="text-sm font-semibold text-on-surface">Configuration</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Set HEYGEN_API_KEY in your environment variables. Get your key from app.heygen.com/settings.
          </p>
        </div>
      </div>
    </div>
  );
}
