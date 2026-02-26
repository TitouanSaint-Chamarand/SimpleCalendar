"use client";

import type { CalendarCell as CalendarCellType } from "@/lib/calendar/types";

export interface CalendarCellProps {
  day: CalendarCellType;
  value: string;
  onEventChange: (day: number, value: string) => void;
}

export default function CalendarCell({
  day,
  value,
  onEventChange,
}: CalendarCellProps) {
  if (day === null) {
    return <span className="calendar-cell-empty" />;
  }

  return (
    <>
      <span className="calendar-day-num">{day}</span>
      <textarea
        className="calendar-textarea"
        value={value}
        onChange={(e) => onEventChange(day, e.target.value)}
        onBlur={(e) => onEventChange(day, e.target.value)}
        placeholder="Événements…"
        rows={5}
      />
    </>
  );
}
