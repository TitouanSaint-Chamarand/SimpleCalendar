import type { EventsMap } from "./types";

/** Contrat de persistance des événements (Dependency Inversion - SOLID) */
export interface EventStorage {
  load(year: number, month: number): EventsMap;
  save(year: number, month: number, events: EventsMap): void;
}

const STORAGE_KEY = "simplecalendar";

function buildKey(year: number, month: number): string {
  return `${STORAGE_KEY}-${year}-${month}`;
}

/** Implémentation localStorage pour EventStorage */
export class LocalStorageEventStorage implements EventStorage {
  load(year: number, month: number): EventsMap {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(buildKey(year, month));
      if (!raw) return {};
      const parsed = JSON.parse(raw) as Record<string, string>;
      const out: EventsMap = {};
      for (const [k, v] of Object.entries(parsed)) {
        const d = parseInt(k, 10);
        if (!Number.isNaN(d) && typeof v === "string") out[d] = v;
      }
      return out;
    } catch {
      return {};
    }
  }

  save(year: number, month: number, events: EventsMap): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(buildKey(year, month), JSON.stringify(events));
    } catch {
      // ignore
    }
  }
}

/** Instance par défaut pour le client */
export const defaultEventStorage = new LocalStorageEventStorage();
