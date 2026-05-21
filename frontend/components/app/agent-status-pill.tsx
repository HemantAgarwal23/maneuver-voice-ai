'use client';

import { type AgentState } from '@livekit/components-react';

interface AgentStatusPillProps {
  agentState?: AgentState;
}

const STATUS_MAP: Record<string, string> = {
  listening: 'Listening',
  thinking: 'Thinking',
  speaking: 'Speaking',
  connecting: 'Connecting',
  initializing: 'Initializing',
  disconnected: 'Disconnected',
};

export function AgentStatusPill({ agentState }: AgentStatusPillProps) {
  const normalizedState = agentState ?? 'connecting';
  const label = STATUS_MAP[normalizedState] ?? 'Connected';
  const isActiveState =
    normalizedState === 'listening' ||
    normalizedState === 'thinking' ||
    normalizedState === 'speaking';

  return (
    <div className="bg-card/90 border-border/70 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-md">
      <span
        className={
          normalizedState === 'listening'
            ? 'bg-emerald-500 h-2 w-2 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.7)]'
            : normalizedState === 'thinking'
              ? 'bg-amber-500 h-2 w-2 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.7)]'
              : normalizedState === 'speaking'
                ? 'bg-sky-500 h-2 w-2 rounded-full shadow-[0_0_12px_rgba(14,165,233,0.7)]'
                : 'bg-muted-foreground h-2 w-2 rounded-full'
        }
      />
      <span>{label}</span>
      {isActiveState && <span className="bg-foreground/30 h-1 w-1 animate-pulse rounded-full" />}
    </div>
  );
}
