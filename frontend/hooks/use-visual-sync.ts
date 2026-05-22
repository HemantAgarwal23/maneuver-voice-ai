'use client';

import { useEffect, useState } from 'react';
import { RoomEvent, type Participant } from 'livekit-client';
import { useSessionContext } from '@livekit/components-react';
import { type VisualState } from '@/lib/visual-intents';

type VisualSyncEvent =
  | { type: 'show_services_slide' }
  | { type: 'show_service_detail'; name: string }
  | { type: 'show_process_diagram' }
  | { type: 'show_pricing_card' }
  | { type: 'show_case_studies' }
  | { type: 'update_lead_field'; field: string; value: string };

function mapEventToVisualState(event: VisualSyncEvent): VisualState | null {
  if (event.type === 'show_services_slide') {
    return {
      mode: 'services',
      title: 'Maneuver Services',
      subtitle: 'Core capabilities that can be adapted to your business needs.',
    };
  }
  if (event.type === 'show_service_detail') {
    return {
      mode: 'service_detail',
      highlightedService: event.name,
      title: 'Focused Service Detail',
      subtitle: 'The conversation has zoomed into one specific capability.',
    };
  }
  if (event.type === 'show_process_diagram') {
    return {
      mode: 'process',
      title: 'Implementation Process',
      subtitle: 'A structured path from discovery to measurable outcomes.',
    };
  }
  if (event.type === 'show_pricing_card') {
    return {
      mode: 'pricing',
      title: 'Engagement Model',
      subtitle: 'Flexible options from discovery sprint to ongoing optimization.',
    };
  }
  if (event.type === 'show_case_studies') {
    return {
      mode: 'case_studies',
      title: 'Case Study Highlights',
      subtitle: 'Real outcomes from practical automation rollouts.',
    };
  }
  return null;
}

export function useVisualSync() {
  const session = useSessionContext();
  const [visualState, setVisualState] = useState<VisualState | null>(null);

  useEffect(() => {
    const room = session.room;
    if (!room) return;

    const handler = (
      payload: Uint8Array,
      _participant?: Participant,
      _kind?: unknown,
      topic?: string
    ) => {
      if (topic !== 'ui.visual') return;
      try {
        const decoded = new TextDecoder().decode(payload);
        const event = JSON.parse(decoded) as VisualSyncEvent;
        const mapped = mapEventToVisualState(event);
        if (mapped) setVisualState(mapped);
      } catch {
        // ignore malformed packets
      }
    };

    room.on(RoomEvent.DataReceived, handler);
    return () => {
      room.off(RoomEvent.DataReceived, handler);
    };
  }, [session.room]);

  return { visualState };
}
