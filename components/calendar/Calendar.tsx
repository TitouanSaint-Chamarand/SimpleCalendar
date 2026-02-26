"use client";

import { useMemo } from "react";
import { getCalendarGrid } from "@/lib/calendar/date-utils";
import { useCalendarNavigation } from "@/hooks/useCalendarNavigation";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import CalendarHeader from "./CalendarHeader";
import FormattingToolbar from "./FormattingToolbar";
import CalendarGrid from "./CalendarGrid";

/** Orchestre le calendrier : navigation, événements et affichage (composition) */
export default function Calendar() {
  const { year, month, goPrev, goNext } = useCalendarNavigation();
  const { events, updateEvent } = useCalendarEvents(year, month);

  const { cells, rows } = useMemo(
    () => getCalendarGrid(year, month),
    [year, month]
  );

  return (
    <main className="max-w-7xl mx-auto">
      <CalendarHeader
        month={month}
        year={year}
        onPrev={goPrev}
        onNext={goNext}
      />
      <FormattingToolbar />
      <CalendarGrid
        cells={cells}
        rows={rows}
        year={year}
        month={month}
        events={events}
        onEventChange={updateEvent}
      />
    </main>
  );
}
