"use client";

import { useState, useCallback } from "react";

export interface UseCalendarNavigationReturn {
  year: number;
  month: number;
  goPrev: () => void;
  goNext: () => void;
}

/** Gère la navigation année/mois du calendrier (Single Responsibility) */
export function useCalendarNavigation(
  initialDate: Date = new Date()
): UseCalendarNavigationReturn {
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());

  const goPrev = useCallback(() => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  }, [month]);

  const goNext = useCallback(() => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }, [month]);

  return { year, month, goPrev, goNext };
}
