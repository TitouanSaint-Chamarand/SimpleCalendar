"use client";

import type { CalendarCell as CalendarCellType } from "@/lib/calendar/types";
import type { EventsMap } from "@/lib/events/types";
import { JOURS } from "@/lib/calendar/constants";
import CalendarCell from "./CalendarCell";

export interface CalendarGridProps {
  cells: CalendarCellType[];
  rows: number;
  year: number;
  month: number;
  events: EventsMap;
  onEventChange: (day: number, value: string) => void;
}

export default function CalendarGrid({
  cells,
  rows,
  year,
  month,
  events,
  onEventChange,
}: CalendarGridProps) {
  const today = new Date();
  const isTodayCell = (day: number, isCurrentMonth: boolean) =>
    isCurrentMonth &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const isPastCell = (day: number, isCurrentMonth: boolean): boolean => {
    if (!isCurrentMonth) return false;
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    if (year < y) return true;
    if (year > y) return false;
    if (month < m) return true;
    if (month > m) return false;
    return day < d;
  };

  return (
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
          {cells.slice(rowIndex * 7, rowIndex * 7 + 7).map((cell, colIndex) => {
            const past = isPastCell(cell.day, cell.isCurrentMonth);
            return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`calendar-cell ${!cell.isCurrentMonth ? "calendar-cell-other-month" : ""} ${past ? "calendar-cell-past" : ""}`}
            >
              <CalendarCell
                day={cell.day}
                isCurrentMonth={cell.isCurrentMonth}
                isToday={isTodayCell(cell.day, cell.isCurrentMonth)}
                value={cell.isCurrentMonth ? events[cell.day] ?? "" : ""}
                onEventChange={onEventChange}
              />
            </div>
          );
          })}
        </div>
      ))}
    </div>
  );
}
