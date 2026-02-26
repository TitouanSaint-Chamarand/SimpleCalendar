/** Une cellule : numéro du jour affiché et si c’est le mois courant (éditable) */
export type CalendarCell = {
  day: number;
  isCurrentMonth: boolean;
};

/** Grille du mois : tableau de cellules (7 par ligne) */
export type CalendarGrid = {
  cells: CalendarCell[];
  rows: number;
};
