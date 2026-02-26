"use client";

import { useState, useEffect, useCallback } from "react";
import type { EventsMap } from "@/lib/events/types";
import type { EventStorage } from "@/lib/events/storage";
import { defaultEventStorage } from "@/lib/events/storage";

export interface UseCalendarEventsReturn {
  events: EventsMap;
  updateEvent: (day: number, value: string) => void;
}

/** Charge et persiste les événements pour un mois (Single Responsibility) */
export function useCalendarEvents(
  year: number,
  month: number,
  storage: EventStorage = defaultEventStorage
): UseCalendarEventsReturn {
  const [events, setEvents] = useState<EventsMap>({});

  useEffect(() => {
    setEvents(storage.load(year, month));
  }, [year, month, storage]);

  const updateEvent = useCallback(
    (day: number, value: string) => {
      setEvents((prev) => {
        const next = { ...prev };
        if (value.trim() === "") {
          delete next[day];
        } else {
          next[day] = value;
        }
        storage.save(year, month, next);
        return next;
      });
    },
    [year, month, storage]
  );

  return { events, updateEvent };
}
