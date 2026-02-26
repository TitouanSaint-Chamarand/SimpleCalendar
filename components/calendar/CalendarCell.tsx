"use client";

import RichTextCell from "./RichTextCell";

export interface CalendarCellProps {
  day: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  value: string;
  onEventChange: (day: number, value: string) => void;
}

export default function CalendarCell({
  day,
  isCurrentMonth,
  isToday = false,
  value,
  onEventChange,
}: CalendarCellProps) {
  return (
    <div className="flex flex-1 flex-col min-h-0">
      <span
        className={`calendar-day-num shrink-0 ${isToday ? "calendar-day-num-today" : ""}`}
      >
        {day}
      </span>
      {isCurrentMonth ? (
        <RichTextCell
          value={value}
          onChange={(html) => onEventChange(day, html)}
          placeholder="Note…"
        />
      ) : (
        <span className="flex-1 min-h-0 block" aria-hidden />
      )}
    </div>
  );
}
