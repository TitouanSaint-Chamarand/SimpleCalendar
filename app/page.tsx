"use client";

import { useState, useEffect, useCallback } from "react";

const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const MOIS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** 0 = lundi, 6 = dimanche */
function getFirstDayOffset(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay(); // 0 = dimanche, 1 = lundi...
  return (day + 6) % 7;
}

const STORAGE_KEY = "simplecalendar";

function loadEvents(year: number, month: number): Record<number, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}-${year}-${month}`);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    const out: Record<number, string> = {};
    for (const [k, v] of Object.entries(parsed)) {
      const d = parseInt(k, 10);
      if (!Number.isNaN(d) && typeof v === "string") out[d] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function saveEvents(year: number, month: number, events: Record<number, string>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_KEY}-${year}-${month}`, JSON.stringify(events));
  } catch {
    // ignore
  }
}

export default function Home() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [events, setEvents] = useState<Record<number, string>>({});

  const load = useCallback(() => {
    setEvents(loadEvents(year, month));
  }, [year, month]);

  useEffect(() => {
    load();
  }, [load]);

  const updateEvent = useCallback(
    (day: number, value: string) => {
      setEvents((prev) => {
        const next = { ...prev };
        if (value.trim() === "") {
          delete next[day];
        } else {
          next[day] = value;
        }
        saveEvents(year, month, next);
        return next;
      });
    },
    [year, month]
  );

  const goPrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstOffset = getFirstDayOffset(year, month);
  const totalCells = firstOffset + daysInMonth;
  const rows = Math.ceil(totalCells / 7);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const remainder = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < remainder; i++) cells.push(null);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <main className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-semibold">Calendrier</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="px-3 py-1.5 rounded border border-foreground/20 hover:bg-foreground/10 transition-colors"
            >
              ← Mois précédent
            </button>
            <span className="font-medium min-w-[180px] text-center">
              {MOIS[month]} {year}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="px-3 py-1.5 rounded border border-foreground/20 hover:bg-foreground/10 transition-colors"
            >
              Mois suivant →
            </button>
          </div>
        </div>

        <div className="calendar-grid overflow-x-auto">
          <div className="calendar-row calendar-header">
            {JOURS.map((j) => (
              <div key={j} className="calendar-cell calendar-cell-header">
                {j}
              </div>
            ))}
          </div>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="calendar-row">
              {cells.slice(rowIndex * 7, rowIndex * 7 + 7).map((day, colIndex) => (
                <div key={colIndex} className="calendar-cell">
                  {day !== null ? (
                    <>
                      <span className="calendar-day-num">{day}</span>
                      <textarea
                        className="calendar-textarea"
                        value={events[day] ?? ""}
                        onChange={(e) => updateEvent(day, e.target.value)}
                        onBlur={(e) => updateEvent(day, e.target.value)}
                        placeholder="Événements…"
                        rows={3}
                      />
                    </>
                  ) : (
                    <span className="calendar-cell-empty" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
