import { type ReceivedMessage } from '@livekit/components-react';

export type VisualMode = 'overview' | 'services' | 'service_detail' | 'process' | 'pricing' | 'case_studies';

export interface VisualState {
  mode: VisualMode;
  highlightedService?: string;
  title: string;
  subtitle: string;
}

const SERVICES = [
  'AI discovery and opportunity mapping',
  'Voice and chat automation design',
  'Sales and support workflow automation',
  'Internal knowledge assistant implementation',
  'Integration planning and rollout support',
];

function findServiceDetail(text: string): string | undefined {
  const normalized = text.toLowerCase();
  if (normalized.includes('support')) return 'Sales and support workflow automation';
  if (normalized.includes('voice') || normalized.includes('chat'))
    return 'Voice and chat automation design';
  if (normalized.includes('knowledge')) return 'Internal knowledge assistant implementation';
  if (normalized.includes('integration')) return 'Integration planning and rollout support';
  if (normalized.includes('discovery')) return 'AI discovery and opportunity mapping';
  return undefined;
}

export function deriveVisualState(messages: ReceivedMessage[]): VisualState {
  const lastUserMessage = [...messages].reverse().find((m) => m.from?.isLocal)?.message ?? '';
  const lastAssistantMessage = [...messages].reverse().find((m) => !m.from?.isLocal)?.message ?? '';
  const combined = `${lastUserMessage} ${lastAssistantMessage}`.toLowerCase();

  if (/(case stud|example|results|outcome)/.test(combined)) {
    return {
      mode: 'case_studies',
      title: 'Case Study Highlights',
      subtitle: 'Real outcomes from practical automation rollouts.',
    };
  }

  if (/(pricing|cost|budget|retainer|fee)/.test(combined)) {
    return {
      mode: 'pricing',
      title: 'Engagement Model',
      subtitle: 'Flexible options from discovery sprint to ongoing optimization.',
    };
  }

  if (/(process|how do you work|workflow|rollout)/.test(combined)) {
    return {
      mode: 'process',
      title: 'Implementation Process',
      subtitle: 'A structured path from discovery to measurable outcomes.',
    };
  }

  const serviceDetail = findServiceDetail(combined);
  if (serviceDetail) {
    return {
      mode: 'service_detail',
      highlightedService: serviceDetail,
      title: 'Focused Service Detail',
      subtitle: 'The conversation has zoomed into one specific capability.',
    };
  }

  if (/(service|what do you offer|offerings)/.test(combined)) {
    return {
      mode: 'services',
      title: 'Maneuver Services',
      subtitle: 'Core capabilities that can be adapted to your business needs.',
    };
  }

  return {
    mode: 'overview',
    title: 'Live Discovery Canvas',
    subtitle: 'Visual guidance updates as the voice conversation evolves.',
  };
}

export const VISUAL_SERVICES = SERVICES;
