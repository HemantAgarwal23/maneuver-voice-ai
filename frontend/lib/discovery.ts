import { type ReceivedMessage } from '@livekit/components-react';

export interface DiscoverySummary {
  name: string;
  company: string;
  industry: string;
  current_problem: string;
  team_size: string;
  timeline: string;
  budget: string;
  goals: string;
}

const EMPTY_VALUE = 'Not captured yet';

const FIELD_PATTERNS: Record<keyof DiscoverySummary, RegExp[]> = {
  name: [/my name is ([^.,\n]+)/i, /i am ([^.,\n]+)/i, /this is ([^.,\n]+)/i],
  company: [
    /company (?:is|name is) ([^.,\n]+)/i,
    /i work at ([^.,\n]+)/i,
    /from ([^.,\n]+)\s*(?:company|inc|llc|ltd)?/i,
  ],
  industry: [/industry (?:is|we are in) ([^.,\n]+)/i, /we are in ([^.,\n]+) industry/i],
  current_problem: [
    /problem is ([^.\n]+)/i,
    /our challenge is ([^.\n]+)/i,
    /we are struggling with ([^.\n]+)/i,
  ],
  team_size: [/team size is ([^.,\n]+)/i, /we are ([^.,\n]+) people/i, /team of ([^.,\n]+)/i],
  timeline: [/timeline is ([^.,\n]+)/i, /in ([^.,\n]+) (?:weeks|months)/i, /by ([^.,\n]+)/i],
  budget: [/budget is ([^.,\n]+)/i, /budget around ([^.,\n]+)/i, /we can spend ([^.,\n]+)/i],
  goals: [/goal is ([^.\n]+)/i, /we want to ([^.\n]+)/i, /our objective is ([^.\n]+)/i],
};

const normalizeValue = (raw: string): string => raw.trim().replace(/\s+/g, ' ');

export function buildDiscoverySummary(messages: ReceivedMessage[]): DiscoverySummary {
  const transcriptText = messages
    .map((message) => message.message)
    .filter(Boolean)
    .join('\n');

  const summary = {} as DiscoverySummary;
  (Object.keys(FIELD_PATTERNS) as Array<keyof DiscoverySummary>).forEach((field) => {
    const patterns = FIELD_PATTERNS[field];
    const matched = patterns
      .map((pattern) => transcriptText.match(pattern)?.[1])
      .find((value) => Boolean(value?.trim()));
    summary[field] = matched ? normalizeValue(matched) : EMPTY_VALUE;
  });

  return summary;
}
