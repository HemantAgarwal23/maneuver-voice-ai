'use client';

import { type DiscoverySummary } from '@/lib/discovery';

interface DiscoverySummaryPanelProps {
  summary: DiscoverySummary;
}

const LABELS: Record<keyof DiscoverySummary, string> = {
  name: 'Name',
  company: 'Company',
  industry: 'Industry',
  current_problem: 'Current Problem',
  team_size: 'Team Size',
  timeline: 'Timeline',
  budget: 'Budget',
  goals: 'Goals',
};

export function DiscoverySummaryPanel({ summary }: DiscoverySummaryPanelProps) {
  return (
    <aside className="bg-card/95 border-border/70 w-full rounded-2xl border p-4 shadow-sm backdrop-blur-sm">
      <h3 className="text-sm font-semibold tracking-wide">Discovery Summary</h3>
      <div className="mt-3 grid gap-2">
        {(Object.keys(LABELS) as Array<keyof DiscoverySummary>).map((field) => (
          <div key={field} className="rounded-lg border border-border/60 px-3 py-2">
            <p className="text-muted-foreground text-[11px] uppercase tracking-wide">{LABELS[field]}</p>
            <p className="text-sm leading-5">{summary[field]}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
