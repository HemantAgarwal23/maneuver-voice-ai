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

const EMPTY_VALUE = 'Not captured yet';

export function DiscoverySummaryPanel({ summary }: DiscoverySummaryPanelProps) {
  const fields = Object.keys(LABELS) as Array<keyof DiscoverySummary>;
  const capturedCount = fields.filter((field) => summary[field] !== EMPTY_VALUE).length;
  const progress = Math.round((capturedCount / fields.length) * 100);
  const isEmpty = capturedCount === 0;

  return (
    <aside className="bg-card/95 border-border/70 w-full rounded-2xl border p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-wide">Discovery Summary</h3>
        <span className="bg-muted text-foreground rounded-full px-2.5 py-1 text-[11px] font-semibold">
          {capturedCount}/{fields.length} captured
        </span>
      </div>

      <div className="bg-muted mt-3 h-2 w-full overflow-hidden rounded-full">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isEmpty && (
        <div className="bg-muted/50 border-border/60 mt-4 rounded-xl border p-3">
          <p className="text-sm font-medium">No discovery details captured yet.</p>
          <p className="text-muted-foreground mt-1 text-xs leading-5">
            Start by introducing your business problem, industry, and goals.
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-2">
        {fields.map((field) => {
          const value = summary[field];
          const captured = value !== EMPTY_VALUE;
          return (
            <div key={field} className="rounded-lg border border-border/60 px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-muted-foreground text-[11px] uppercase tracking-wide">{LABELS[field]}</p>
                <span
                  className={
                    captured
                      ? 'text-emerald-400 text-[11px] font-semibold'
                      : 'text-muted-foreground text-[11px]'
                  }
                >
                  {captured ? 'Captured' : 'Pending'}
                </span>
              </div>
              <p className="mt-1 text-sm leading-5">{value}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
