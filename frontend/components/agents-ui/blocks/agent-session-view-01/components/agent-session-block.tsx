'use client';

import React, { useState } from 'react';
import { AnimatePresence, type MotionProps, motion } from 'motion/react';
import { useAgent, useSessionContext, useSessionMessages } from '@livekit/components-react';
import { AgentChatTranscript } from '@/components/agents-ui/agent-chat-transcript';
import {
  AgentControlBar,
  type AgentControlBarControls,
} from '@/components/agents-ui/agent-control-bar';
import { AgentStatusPill } from '@/components/app/agent-status-pill';
import { DiscoverySummaryPanel } from '@/components/app/discovery-summary-panel';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { buildDiscoverySummary } from '@/lib/discovery';
import { cn } from '@/lib/shadcn/utils';
import { TileLayout } from './tile-view';

const MotionMessage = motion.create(Shimmer);

const BOTTOM_VIEW_MOTION_PROPS: MotionProps = {
  variants: {
    visible: {
      opacity: 1,
      translateY: '0%',
    },
    hidden: {
      opacity: 0,
      translateY: '100%',
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: 'easeOut',
  },
};

const CHAT_MOTION_PROPS: MotionProps = {
  variants: {
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        ease: 'easeOut',
        duration: 0.3,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

const SHIMMER_MOTION_PROPS: MotionProps = {
  variants: {
    visible: {
      opacity: 1,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
        delay: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
        delay: 0,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        'from-background pointer-events-none h-4 bg-linear-to-b to-transparent',
        top && 'bg-linear-to-b',
        bottom && 'bg-linear-to-t',
        className
      )}
    />
  );
}

export interface AgentSessionView_01Props {
  preConnectMessage?: string;
  supportsChatInput?: boolean;
  supportsVideoInput?: boolean;
  supportsScreenShare?: boolean;
  isPreConnectBufferEnabled?: boolean;
  audioVisualizerType?: 'bar' | 'wave' | 'grid' | 'radial' | 'aura';
  audioVisualizerColor?: `#${string}`;
  audioVisualizerColorShift?: number;
  audioVisualizerBarCount?: number;
  audioVisualizerGridRowCount?: number;
  audioVisualizerGridColumnCount?: number;
  audioVisualizerRadialBarCount?: number;
  audioVisualizerRadialRadius?: number;
  audioVisualizerWaveLineWidth?: number;
  className?: string;
}

export function AgentSessionView_01({
  preConnectMessage = 'Agent is listening, ask it a question',
  supportsChatInput = true,
  supportsVideoInput = true,
  supportsScreenShare = true,
  isPreConnectBufferEnabled = true,
  audioVisualizerType,
  audioVisualizerColor,
  audioVisualizerColorShift,
  audioVisualizerBarCount,
  audioVisualizerGridRowCount,
  audioVisualizerGridColumnCount,
  audioVisualizerRadialBarCount,
  audioVisualizerRadialRadius,
  audioVisualizerWaveLineWidth,
  ref,
  className,
  ...props
}: React.ComponentProps<'section'> & AgentSessionView_01Props) {
  const session = useSessionContext();
  const { messages } = useSessionMessages(session);
  const [chatOpen, setChatOpen] = useState(false);
  const { state: agentState } = useAgent();
  const discoverySummary = buildDiscoverySummary(messages);

  const controls: AgentControlBarControls = {
    leave: true,
    microphone: true,
    chat: supportsChatInput,
    camera: supportsVideoInput,
    screenShare: supportsScreenShare,
  };

  return (
    <section
      ref={ref}
      className={cn('bg-background relative z-10 h-full w-full overflow-hidden', className)}
      {...props}
    >
      <Fade top className="absolute inset-x-4 top-0 z-20 h-20 md:h-40" />
      <div className="absolute top-16 left-4 z-40 md:top-24 md:left-8">
        <AgentStatusPill agentState={agentState} />
      </div>

      <div className="absolute top-24 bottom-[132px] z-30 flex w-full flex-col px-4 md:top-32 md:bottom-[172px] md:px-8">
        <AnimatePresence>
          <motion.div
            {...CHAT_MOTION_PROPS}
            className="grid h-full w-full min-h-0 gap-4 transition-opacity duration-300 ease-out lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)_minmax(300px,360px)]"
          >
            <div className="bg-card/90 border-border/70 hidden h-full min-h-0 rounded-2xl border shadow-sm backdrop-blur-md lg:flex lg:flex-col">
              <div className="border-border/60 flex items-center justify-between border-b px-4 py-3.5">
                <p className="text-xs font-semibold tracking-wide uppercase">Conversation</p>
              </div>
              <AgentChatTranscript
                agentState={agentState}
                messages={messages}
                className="h-full w-full [&_.is-user>div]:rounded-[18px] [&_.is-user>div]:bg-sky-500/10 [&_.is-user>div]:border-sky-400/20 [&_.is-assistant>div]:bg-emerald-500/8 [&_.is-assistant>div]:border-emerald-400/20 [&>div>div]:px-3 [&>div>div]:pt-3"
              />
            </div>

            <div className="pointer-events-none hidden lg:block" />

            <div className="bg-card/90 border-border/70 hidden h-full overflow-y-auto rounded-2xl border p-3.5 shadow-sm backdrop-blur-md lg:block">
              <DiscoverySummaryPanel summary={discoverySummary} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-4 top-[98px] bottom-[132px] z-30 md:hidden">
        <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_240px] gap-3.5">
          <div className="pointer-events-none" />
          <div className="bg-card/90 border-border/70 min-h-0 rounded-2xl border shadow-sm backdrop-blur-md">
            <div className="border-border/60 flex items-center justify-between border-b px-3.5 py-2.5">
              <p className="text-xs font-semibold tracking-wide uppercase">Conversation</p>
            </div>
            <AgentChatTranscript
              agentState={agentState}
              messages={messages}
              className="h-full w-full [&_.is-user>div]:rounded-[16px] [&_.is-user>div]:bg-sky-500/10 [&_.is-user>div]:border-sky-400/20 [&_.is-assistant>div]:bg-emerald-500/8 [&_.is-assistant>div]:border-emerald-400/20 [&>div>div]:px-3 [&>div>div]:pt-2.5"
            />
          </div>
        </div>
      </div>

      <div className="absolute right-4 bottom-[228px] z-30 w-[min(91vw,440px)] md:hidden">
        <div className="bg-card/90 border-border/70 max-h-[220px] overflow-y-auto rounded-2xl border p-2.5 shadow-sm backdrop-blur-md">
          <DiscoverySummaryPanel summary={discoverySummary} />
        </div>
      </div>

      <TileLayout
        chatOpen={chatOpen}
        audioVisualizerType={audioVisualizerType}
        audioVisualizerColor={audioVisualizerColor}
        audioVisualizerColorShift={audioVisualizerColorShift}
        audioVisualizerBarCount={audioVisualizerBarCount}
        audioVisualizerRadialBarCount={audioVisualizerRadialBarCount}
        audioVisualizerRadialRadius={audioVisualizerRadialRadius}
        audioVisualizerGridRowCount={audioVisualizerGridRowCount}
        audioVisualizerGridColumnCount={audioVisualizerGridColumnCount}
        audioVisualizerWaveLineWidth={audioVisualizerWaveLineWidth}
      />

      <motion.div
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="absolute inset-x-3 bottom-0 z-50 md:inset-x-12"
      >
        {isPreConnectBufferEnabled && (
          <AnimatePresence>
            {messages.length === 0 && (
              <MotionMessage
                key="pre-connect-message"
                duration={2}
                aria-hidden={messages.length > 0}
                {...SHIMMER_MOTION_PROPS}
                className="pointer-events-none mx-auto block w-full max-w-2xl pb-4 text-center text-sm font-semibold"
              >
                {preConnectMessage}
              </MotionMessage>
            )}
          </AnimatePresence>
        )}
        <div className="bg-background relative mx-auto max-w-2xl pb-3 md:pb-12">
          <Fade bottom className="absolute inset-x-0 top-0 h-4 -translate-y-full" />
          <AgentControlBar
            variant="livekit"
            controls={controls}
            isChatOpen={chatOpen}
            isConnected={session.isConnected}
            onDisconnect={session.end}
            onIsChatOpenChange={setChatOpen}
          />
        </div>
      </motion.div>
    </section>
  );
}
