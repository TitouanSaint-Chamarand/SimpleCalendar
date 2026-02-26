"use client";

import { MOIS } from "@/lib/calendar/constants";

export interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarHeader({
  month,
  year,
  onPrev,
  onNext,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <h1 className="text-xl font-semibold">Calendrier</h1>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-3 py-1.5 rounded border border-foreground/20 hover:bg-foreground/10 transition-colors"
        >
          ← Mois précédent
        </button>
        <span className="font-medium min-w-[180px] text-center">
          {MOIS[month]} {year}
        </span>
        <button
          type="button"
          onClick={onNext}
          className="px-3 py-1.5 rounded border border-foreground/20 hover:bg-foreground/10 transition-colors"
        >
          Mois suivant →
        </button>
      </div>
    </div>
  );
}
