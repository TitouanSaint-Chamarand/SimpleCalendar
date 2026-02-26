/** Cellule du calendrier : jour du mois (1–31) ou null si vide */
export type CalendarCell = number | null;

/** Grille du mois : tableau de cellules (7 par ligne) */
export type CalendarGrid = {
  cells: CalendarCell[];
  rows: number;
};
