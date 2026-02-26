import type { CalendarCell, CalendarGrid } from "./types";

/** Nombre de jours dans le mois (month 0 = janvier) */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Décalage du premier jour du mois (0 = lundi, 6 = dimanche) */
export function getFirstDayOffset(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

/** Construit la grille de cellules pour un mois donné */
export function getCalendarGrid(year: number, month: number): CalendarGrid {
  const daysInMonth = getDaysInMonth(year, month);
  const firstOffset = getFirstDayOffset(year, month);
  const totalCells = firstOffset + daysInMonth;
  const rows = Math.ceil(totalCells / 7);

  const cells: CalendarCell[] = [];
  for (let i = 0; i < firstOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const remainder = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < remainder; i++) cells.push(null);

  return { cells, rows };
}
