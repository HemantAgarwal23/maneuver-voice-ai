'use client';

import { type ComponentProps, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { type AgentState, type ReceivedMessage } from '@livekit/components-react';
import { AgentChatIndicator } from '@/components/agents-ui/agent-chat-indicator';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';

/**
 * Props for the AgentChatTranscript component.
 */
export interface AgentChatTranscriptProps extends ComponentProps<'div'> {
  /**
   * The current state of the agent. When 'thinking', displays a loading indicator.
   */
  agentState?: AgentState;
  /**
   * Array of messages to display in the transcript.
   * @defaultValue []
   */
  messages?: ReceivedMessage[];
  /**
   * Additional CSS class names to apply to the conversation container.
   */
  className?: string;
}

/**
 * A chat transcript component that displays a conversation between the user and agent.
 * Shows messages with timestamps and origin indicators, plus a thinking indicator
 * when the agent is processing.
 *
 * @extends ComponentProps<'div'>
 *
 * @example
 * ```tsx
 * <AgentChatTranscript
 *   agentState={agentState}
 *   messages={chatMessages}
 * />
 * ```
 */
export function AgentChatTranscript({
  agentState,
  messages = [],
  className,
  ...props
}: AgentChatTranscriptProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, agentState]);

  return (
    <Conversation className={className} {...props}>
      <ConversationContent>
        {messages.map((receivedMessage) => {
          const { id, timestamp, from, message } = receivedMessage;
          const locale = navigator?.language ?? 'en-US';
          const messageOrigin = from?.isLocal ? 'user' : 'assistant';
          const time = new Date(timestamp);
          const title = time.toLocaleTimeString(locale, { timeStyle: 'short' });
          const roleLabel = messageOrigin === 'user' ? 'You' : 'Consultant';

          return (
            <Message key={id} title={title} from={messageOrigin}>
              <MessageContent>
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold tracking-wide">
                  <span className={messageOrigin === 'user' ? 'text-sky-300' : 'text-emerald-300'}>
                    {roleLabel}
                  </span>
                  <span className="text-muted-foreground">{title}</span>
                </div>
                <MessageResponse className="leading-6">{message}</MessageResponse>
              </MessageContent>
            </Message>
          );
        })}
        <AnimatePresence>
          {agentState === 'thinking' && (
            <div className="bg-muted/40 border-border/50 flex w-fit items-center gap-2 rounded-full border px-3 py-1.5">
              <AgentChatIndicator size="sm" />
              <span className="text-muted-foreground text-xs">Consultant is thinking...</span>
            </div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
