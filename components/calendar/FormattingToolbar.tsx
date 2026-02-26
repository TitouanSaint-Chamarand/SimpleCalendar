"use client";

import { applyTextColor, applyHighlight, removeHighlight, TEXT_COLORS, HIGHLIGHT_COLORS } from "@/lib/richtext/formatting";

/** Barre de formatage (couleur du texte, surlignage) fixe en haut, suit au scroll. S’applique à la sélection courante dans une cellule. */
export default function FormattingToolbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-2 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex flex-wrap items-center gap-3 py-2 px-4 rounded-lg border border-border bg-muted/30 max-w-7xl w-full">
      <span className="text-sm text-muted-foreground font-medium">Format :</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground" title="Couleur du texte">
          A
        </span>
        <div className="flex items-center gap-1">
          {TEXT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              title={`Couleur ${color}`}
              className="w-6 h-6 rounded border border-border cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-1 transition-shadow"
              style={{ backgroundColor: color }}
              onClick={() => applyTextColor(color)}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground" title="Surligner">
          🖍
        </span>
        <div className="flex items-center gap-1">
          {HIGHLIGHT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              title={`Surligner ${color}`}
              className="w-6 h-6 rounded border border-border cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-1 transition-shadow"
              style={{ backgroundColor: color }}
              onClick={() => applyHighlight(color)}
            />
          ))}
        </div>
        <button
          type="button"
          title="Enlever le surlignage"
          className="relative w-6 h-6 rounded border border-border cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-1 transition-shadow bg-white flex items-center justify-center shrink-0"
          onClick={() => removeHighlight()}
        >
          <span
            className="absolute w-[140%] h-0.5 bg-red-500 rounded"
            style={{ transform: "rotate(-45deg)" }}
          />
        </button>
      </div>
      </div>
    </div>
  );
}
