"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import StreamingAvatarAPI, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
  VoiceChatTransport,
} from "@heygen/streaming-avatar";

type SessionState = "idle" | "loading" | "connected" | "error";

interface StreamingAvatarPlayerProps {
  avatarName?: string;
  language?: string;
  className?: string;
}

export default function StreamingAvatarPlayer({
  avatarName = "default",
  language = "en",
  className = "",
}: StreamingAvatarPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const avatarRef = useRef<StreamingAvatarAPI | null>(null);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [isTalking, setIsTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userTranscript, setUserTranscript] = useState("");

  const cleanup = useCallback(() => {
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
    if (avatarRef.current) {
      avatarRef.current.stopAvatar();
      avatarRef.current = null;
    }
    setSessionState("idle");
    setIsTalking(false);
    setIsMuted(true);
    setIsVoiceChatActive(false);
    setUserTranscript("");
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  async function fetchToken(): Promise<string> {
    const res = await fetch("/api/heygen/token", { method: "POST" });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Failed to fetch token");
    }
    const data = await res.json();
    return data.token;
  }

  async function startSession() {
    setSessionState("loading");
    setErrorMessage("");

    try {
      const token = await fetchToken();
      const avatar = new StreamingAvatarAPI({ token });
      avatarRef.current = avatar;

      avatar.on(StreamingEvents.STREAM_READY, (event: { detail?: { mediaStream?: MediaStream } }) => {
        if (videoRef.current && event.detail?.mediaStream) {
          videoRef.current.srcObject = event.detail.mediaStream;
          videoRef.current.play().catch(() => {});
        }
        setSessionState("connected");
      });

      avatar.on(StreamingEvents.AVATAR_START_TALKING, () => setIsTalking(true));
      avatar.on(StreamingEvents.AVATAR_STOP_TALKING, () => setIsTalking(false));

      avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        cleanup();
      });

      avatar.on(StreamingEvents.USER_START, () => setUserTranscript("Listening..."));
      avatar.on(StreamingEvents.USER_STOP, () => setUserTranscript(""));

      await avatar.createStartAvatar({
        quality: AvatarQuality.Medium,
        avatarName,
        language,
        voiceChatTransport: VoiceChatTransport.WEBSOCKET,
      });

      keepAliveRef.current = setInterval(() => {
        avatarRef.current?.keepAlive();
      }, 270_000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(msg);
      setSessionState("error");
    }
  }

  async function toggleVoiceChat() {
    if (!avatarRef.current) return;

    if (isVoiceChatActive) {
      avatarRef.current.closeVoiceChat();
      setIsVoiceChatActive(false);
      setIsMuted(true);
    } else {
      await avatarRef.current.startVoiceChat({
        isInputAudioMuted: true,
      });
      setIsVoiceChatActive(true);
      setIsMuted(true);
    }
  }

  function toggleMute() {
    if (!avatarRef.current) return;
    if (isMuted) {
      avatarRef.current.unmuteInputAudio();
    } else {
      avatarRef.current.muteInputAudio();
    }
    setIsMuted(!isMuted);
  }

  async function sendText() {
    if (!avatarRef.current || !textInput.trim()) return;
    await avatarRef.current.speak({
      text: textInput.trim(),
      task_type: TaskType.TALK,
    });
    setTextInput("");
  }

  function interrupt() {
    avatarRef.current?.interrupt();
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Video container */}
      <div className="relative rounded-lg overflow-hidden bg-inverse-surface aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {sessionState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="material-symbols-outlined text-inverse-on-surface/40" style={{ fontSize: 64 }}>
              smart_toy
            </span>
            <button
              onClick={startSession}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-on-primary transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #00579f, #2d70bb)" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                play_arrow
              </span>
              Start Avatar
            </button>
          </div>
        )}

        {sessionState === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-inverse-on-surface/70 text-sm">Connecting...</span>
          </div>
        )}

        {sessionState === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
            <span className="material-symbols-outlined text-error" style={{ fontSize: 40 }}>
              error
            </span>
            <p className="text-inverse-on-surface/70 text-sm text-center">{errorMessage}</p>
            <button
              onClick={startSession}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-on-primary hover:opacity-90"
            >
              Retry
            </button>
          </div>
        )}

        {/* Status overlay */}
        {sessionState === "connected" && (
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isTalking ? "bg-green-400 animate-pulse" : "bg-green-400"}`} />
            <span className="text-white/80 text-xs font-medium bg-black/30 px-2 py-0.5 rounded">
              {isTalking ? "Speaking" : "Ready"}
            </span>
          </div>
        )}

        {userTranscript && sessionState === "connected" && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-black/50 text-white/90 text-xs px-3 py-1.5 rounded">
              {userTranscript}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {sessionState === "connected" && (
        <div className="flex flex-col gap-3">
          {/* Text input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendText()}
              placeholder="Type a message for the avatar..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-on-surface-variant/50"
            />
            <button
              onClick={sendText}
              disabled={!textInput.trim()}
              className="px-4 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                send
              </span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleVoiceChat}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isVoiceChatActive
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                {isVoiceChatActive ? "voice_chat" : "mic"}
              </span>
              {isVoiceChatActive ? "Voice Chat On" : "Voice Chat"}
            </button>

            {isVoiceChatActive && (
              <button
                onClick={toggleMute}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isMuted
                    ? "bg-error-container text-error"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  {isMuted ? "mic_off" : "mic"}
                </span>
                {isMuted ? "Muted" : "Unmute"}
              </button>
            )}

            {isTalking && (
              <button
                onClick={interrupt}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  stop
                </span>
                Interrupt
              </button>
            )}

            <div className="flex-1" />

            <button
              onClick={cleanup}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-error hover:bg-error-container/50 transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                call_end
              </span>
              End Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
