'use client';

import { useEffect, useState } from 'react';

interface Lead {
  file: string;
  captured_at_utc?: string;
  name?: string;
  company?: string;
  industry?: string;
  current_problem?: string;
  team_size?: string;
  timeline?: string;
  budget?: string;
  goals?: string;
}

export default function FounderDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data.leads ?? []))
      .catch(() => setLeads([]));
  }, []);

  return (
    <main className="bg-background min-h-svh p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold md:text-3xl">Founder Lead Dashboard</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Captured discovery outputs from voice calls (local JSON storage).
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {leads.map((lead) => (
            <article key={lead.file} className="rounded-2xl border border-border/70 bg-card/70 p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold">{lead.company ?? 'Unknown company'}</h2>
                <span className="text-muted-foreground text-xs">
                  {lead.captured_at_utc ? new Date(lead.captured_at_utc).toLocaleString() : '-'}
                </span>
              </div>
              <p className="mt-1 text-sm">Contact: {lead.name ?? '-'}</p>
              <p className="mt-1 text-sm">Industry: {lead.industry ?? '-'}</p>
              <p className="mt-1 text-sm">Problem: {lead.current_problem ?? '-'}</p>
              <p className="mt-1 text-sm">Team Size: {lead.team_size ?? '-'}</p>
              <p className="mt-1 text-sm">Timeline: {lead.timeline ?? '-'}</p>
              <p className="mt-1 text-sm">Budget: {lead.budget ?? '-'}</p>
              <p className="mt-1 text-sm">Goals: {lead.goals ?? '-'}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
