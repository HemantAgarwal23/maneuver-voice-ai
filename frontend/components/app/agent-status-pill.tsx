'use client';

import { type AgentState } from '@livekit/components-react';

interface AgentStatusPillProps {
  agentState?: AgentState;
}

const STATUS_MAP: Record<string, string> = {
  listening: 'Listening',
  thinking: 'Thinking',
  speaking: 'Speaking',
  idle: 'Listening',
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

  const dotClass =
    normalizedState === 'listening' || normalizedState === 'idle'
      ? 'bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.75)]'
      : normalizedState === 'thinking'
        ? 'bg-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.75)]'
        : normalizedState === 'speaking'
          ? 'bg-sky-500 shadow-[0_0_14px_rgba(14,165,233,0.75)]'
          : 'bg-muted-foreground';

  return (
    <div className="bg-card/88 border-border/70 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wide backdrop-blur-md">
      <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
        {isActiveState && <span className={['absolute inline-flex h-full w-full animate-ping rounded-full', dotClass].join(' ')} />}
        <span className={['relative h-2.5 w-2.5 rounded-full', dotClass].join(' ')} />
      </span>
      <span>{label}</span>
    </div>
  );
}
