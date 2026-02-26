"use client";

import { MOIS } from "@/lib/calendar/constants";
import { Button } from "@/components/ui/button";

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
        <Button type="button" variant="outline" size="sm" onClick={onPrev}>
          ← Mois précédent
        </Button>
        <span className="font-medium min-w-[180px] text-center">
          {MOIS[month]} {year}
        </span>
        <Button type="button" variant="outline" size="sm" onClick={onNext}>
          Mois suivant →
        </Button>
      </div>
    </div>
  );
}
