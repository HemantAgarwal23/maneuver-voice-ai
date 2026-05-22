import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

interface LeadRecord {
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

export async function GET() {
  try {
    const leadsDir = path.resolve(process.cwd(), '..', 'agent', 'src', 'leads');
    const files = await fs.readdir(leadsDir);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const leads: Array<LeadRecord & { file: string }> = [];
    for (const file of jsonFiles) {
      const fullPath = path.join(leadsDir, file);
      const raw = await fs.readFile(fullPath, 'utf-8');
      const parsed = JSON.parse(raw) as LeadRecord;
      leads.push({ file, ...parsed });
    }

    leads.sort((a, b) => (b.captured_at_utc ?? '').localeCompare(a.captured_at_utc ?? ''));
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ leads: [] });
  }
}
