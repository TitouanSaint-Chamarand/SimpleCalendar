"use client";

import type { CalendarCell as CalendarCellType } from "@/lib/calendar/types";
import type { EventsMap } from "@/lib/events/types";
import { JOURS } from "@/lib/calendar/constants";
import CalendarCell from "./CalendarCell";

export interface CalendarGridProps {
  cells: CalendarCellType[];
  rows: number;
  events: EventsMap;
  onEventChange: (day: number, value: string) => void;
}

export default function CalendarGrid({
  cells,
  rows,
  events,
  onEventChange,
}: CalendarGridProps) {
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
          {cells.slice(rowIndex * 7, rowIndex * 7 + 7).map((day, colIndex) => (
            <div key={colIndex} className="calendar-cell">
              <CalendarCell
                day={day}
                value={day !== null ? events[day] ?? "" : ""}
                onEventChange={onEventChange}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
