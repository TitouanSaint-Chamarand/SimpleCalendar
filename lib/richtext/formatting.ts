/** Applique la couleur du texte sur la sélection (execCommand pour compatibilité) */
export function applyTextColor(color: string): void {
  if (typeof document === "undefined") return;
  document.execCommand("styleWithCSS", false, "true");
  document.execCommand("foreColor", false, color);
}

/** Applique le surlignage (couleur de fond) sur la sélection */
export function applyHighlight(color: string): void {
  if (typeof document === "undefined") return;
  document.execCommand("styleWithCSS", false, "true");
  document.execCommand("backColor", false, color);
}

/** Enlève le surlignage (couleur de fond) de la sélection */
export function removeHighlight(): void {
  if (typeof document === "undefined") return;
  document.execCommand("styleWithCSS", false, "true");
  document.execCommand("backColor", false, "transparent");
}

/** Couleurs de texte prédéfinies */
export const TEXT_COLORS = [
  "#000000", "#374151", "#dc2626", "#ea580c", "#16a34a", "#2563eb", "#7c3aed", "#6b21a8", "#b91c1c",
];

/** Couleurs de surlignage prédéfinies (style fluo / pastel) */
export const HIGHLIGHT_COLORS = [
  "#fef08a", "#bbf7d0", "#bfdbfe", "#fed7aa", "#fbcfe8", "#e9d5ff", "#a5f3fc", "#fde047",
];
