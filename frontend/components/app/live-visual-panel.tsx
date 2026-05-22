'use client';

import { type ReceivedMessage } from '@livekit/components-react';
import { deriveVisualState, type VisualState, VISUAL_SERVICES } from '@/lib/visual-intents';

interface LiveVisualPanelProps {
  messages: ReceivedMessage[];
  visualStateOverride?: VisualState | null;
}

function ProcessDiagram() {
  const steps = ['Discovery', 'Prioritization', 'Blueprint', 'Pilot', 'Scale'];
  return (
    <div className="mt-4 grid gap-2 md:grid-cols-5">
      {steps.map((step, index) => (
        <div key={step} className="rounded-xl border border-border/60 bg-background/60 p-3 text-center">
          <p className="text-[11px] text-muted-foreground">Step {index + 1}</p>
          <p className="mt-1 text-sm font-semibold">{step}</p>
        </div>
      ))}
    </div>
  );
}

function ServicesGrid({ highlighted }: { highlighted?: string }) {
  return (
    <div className="mt-4 grid gap-2 md:grid-cols-2">
      {VISUAL_SERVICES.map((service) => (
        <div
          key={service}
          className={[
            'rounded-xl border p-3 text-sm leading-5',
            highlighted === service
              ? 'border-sky-400/60 bg-sky-500/12 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]'
              : 'border-border/60 bg-background/60',
          ].join(' ')}
        >
          {service}
        </div>
      ))}
    </div>
  );
}

function ServiceDetailView({ name }: { name: string }) {
  const detailMap: Record<string, { outcomes: string[]; useCases: string[] }> = {
    'AI discovery and opportunity mapping': {
      outcomes: [
        'Clear AI roadmap tied to measurable business KPIs',
        'Prioritized use cases by impact and implementation effort',
        'Faster decision-making for pilot investment',
      ],
      useCases: [
        'Support ticket categorization opportunity map',
        'Sales qualification workflow scoring',
        'Operations bottleneck intelligence blueprint',
      ],
    },
    'Voice and chat automation design': {
      outcomes: [
        'Higher first-response consistency across channels',
        'Reduced repetitive query workload for human teams',
        'Improved customer response speed and availability',
      ],
      useCases: [
        'Voice assistant for inbound support triage',
        'Chat qualification flow for new leads',
        'After-hours FAQ and escalation automation',
      ],
    },
    'Sales and support workflow automation': {
      outcomes: [
        'Lower manual overhead in sales and support operations',
        'Improved routing accuracy and ownership clarity',
        'Better conversion and customer retention visibility',
      ],
      useCases: [
        'Automated lead scoring and assignment',
        'Support intent detection with team routing',
        'CRM task generation from conversation outcomes',
      ],
    },
    'Internal knowledge assistant implementation': {
      outcomes: [
        'Faster internal answer retrieval for teams',
        'Reduced repeated internal questions',
        'Higher confidence in operational decisions',
      ],
      useCases: [
        'Policy and SOP assistant for team members',
        'Internal operations search with context',
        'Onboarding assistant for new hires',
      ],
    },
    'Integration planning and rollout support': {
      outcomes: [
        'Reduced risk during implementation rollout',
        'Cleaner integration between existing systems',
        'Faster transition from pilot to production',
      ],
      useCases: [
        'CRM + support platform integration planning',
        'Data sync strategy across tools',
        'Phased deployment and adoption plan',
      ],
    },
  };

  const detail =
    detailMap[name] ??
    {
      outcomes: [
        'Business-aligned automation opportunity',
        'Operational efficiency improvement',
        'Measurable ROI pathway',
      ],
      useCases: ['Discovery workshop', 'Pilot implementation', 'Scale plan'],
    };

  return (
    <div className="mt-4 space-y-3">
      <div className="rounded-2xl border border-sky-400/55 bg-sky-500/12 p-4 shadow-[0_0_0_1px_rgba(56,189,248,0.28)]">
        <p className="text-[11px] font-semibold tracking-wide uppercase text-sky-300">
          Selected Capability
        </p>
        <h4 className="mt-2 text-lg font-semibold">{name}</h4>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-background/60 p-3.5">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
            Expected Outcomes
          </p>
          <ul className="mt-2 space-y-1.5 text-sm leading-5">
            {detail.outcomes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/60 bg-background/60 p-3.5">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
            Common Use Cases
          </p>
          <ul className="mt-2 space-y-1.5 text-sm leading-5">
            {detail.useCases.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCards() {
  const cards = [
    'Reduced inbound response latency with automated first-touch qualification.',
    'Improved lead follow-up consistency with voice + CRM workflow integration.',
    'Decreased repetitive internal support requests using a knowledge assistant.',
  ];
  return (
    <div className="mt-4 grid gap-2">
      {cards.map((card) => (
        <div key={card} className="rounded-xl border border-border/60 bg-emerald-500/8 p-3 text-sm leading-5">
          {card}
        </div>
      ))}
    </div>
  );
}

function PricingCards() {
  const cards = [
    'Discovery sprint: fixed-fee to map opportunities and architecture.',
    'Pilot build: scoped pricing based on integration depth and complexity.',
    'Optimization retainer: monthly advisory and iterative improvements.',
  ];
  return (
    <div className="mt-4 grid gap-2">
      {cards.map((card) => (
        <div key={card} className="rounded-xl border border-border/60 bg-background/60 p-3 text-sm leading-5">
          {card}
        </div>
      ))}
    </div>
  );
}

function renderVisualBody(state: VisualState) {
  if (state.mode === 'services') return <ServicesGrid />;
  if (state.mode === 'service_detail') {
    return state.highlightedService ? (
      <ServiceDetailView name={state.highlightedService} />
    ) : (
      <ServicesGrid highlighted={state.highlightedService} />
    );
  }
  if (state.mode === 'process') return <ProcessDiagram />;
  if (state.mode === 'pricing') return <PricingCards />;
  if (state.mode === 'case_studies') return <CaseStudyCards />;

  return (
    <div className="mt-4 rounded-xl border border-border/60 bg-background/60 p-4">
      <p className="text-sm leading-6">
        Ask about services, process, case studies, or pricing and this panel will react in real time.
      </p>
    </div>
  );
}

export function LiveVisualPanel({ messages, visualStateOverride }: LiveVisualPanelProps) {
  const state = visualStateOverride ?? deriveVisualState(messages);

  return (
    <div className="bg-card/90 border-border/70 h-full rounded-2xl border p-4 shadow-sm backdrop-blur-md">
      <p className="text-xs font-semibold tracking-wide uppercase text-sky-300">Live Visual Layer</p>
      <h3 className="mt-2 text-lg font-semibold">{state.title}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{state.subtitle}</p>
      {renderVisualBody(state)}
    </div>
  );
}
