"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export interface RichTextCellProps {
  value: string;
  onChange: (html: string) => void;
  className?: string;
  placeholder?: string;
}

/** Applique la couleur du texte sur la sélection (execCommand pour compatibilité) */
function applyTextColor(color: string): void {
  if (typeof document === "undefined") return;
  document.execCommand("styleWithCSS", false, "true");
  document.execCommand("foreColor", false, color);
}

/** Applique le surlignage (couleur de fond) sur la sélection */
function applyHighlight(color: string): void {
  if (typeof document === "undefined") return;
  document.execCommand("styleWithCSS", false, "true");
  document.execCommand("backColor", false, color);
}

export default function RichTextCell({
  value,
  onChange,
  className,
  placeholder = "Note…",
}: RichTextCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);
  const [showPlaceholder, setShowPlaceholder] = useState(!value || value.replace(/<[^>]*>|<br\s*\/?>/gi, "").trim() === "");

  const syncFromValue = useCallback(() => {
    const el = ref.current;
    if (!el || isInternalChange.current) return;
    if (document.activeElement === el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
    setShowPlaceholder(!value || value.replace(/<[^>]*>|<br\s*\/?>/gi, "").trim() === "");
  }, [value]);

  useEffect(syncFromValue, [syncFromValue, value]);

  const handleInput = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    isInternalChange.current = true;
    const html = el.innerHTML;
    onChange(html);
    const hasText = el.innerText.trim().length > 0;
    setShowPlaceholder(!hasText);
    queueMicrotask(() => {
      isInternalChange.current = false;
    });
  }, [onChange]);

  const handleTextColor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      ref.current?.focus();
      applyTextColor(e.target.value);
      e.target.value = "#000000";
    },
    []
  );

  const handleHighlight = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      ref.current?.focus();
      applyHighlight(e.target.value);
      e.target.value = "#ffff00";
    },
    []
  );

  return (
    <div className={cn("flex flex-1 flex-col min-h-0 gap-1", className)}>
      <div className="flex items-center gap-1 shrink-0">
        <label className="flex items-center gap-1 cursor-pointer" title="Couleur du texte">
          <span className="text-xs text-muted-foreground">A</span>
          <input
            type="color"
            className="w-5 h-5 rounded border border-border cursor-pointer bg-transparent"
            defaultValue="#000000"
            onChange={handleTextColor}
            tabIndex={-1}
          />
        </label>
        <label className="flex items-center gap-1 cursor-pointer" title="Surligner">
          <span className="text-xs text-muted-foreground">🖍</span>
          <input
            type="color"
            className="w-5 h-5 rounded border border-border cursor-pointer bg-transparent"
            defaultValue="#ffff00"
            onChange={handleHighlight}
            tabIndex={-1}
          />
        </label>
      </div>
      <div className="relative min-h-0 flex-1">
        {showPlaceholder && (
          <span
            className="pointer-events-none absolute left-0 top-0 text-muted-foreground"
            aria-hidden
          >
            {placeholder}
          </span>
        )}
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          className={cn(
            "min-h-0 flex-1 w-full min-h-[1.5em] border-0 bg-transparent outline-none relative z-10",
            "focus-visible:ring-1 focus-visible:ring-border rounded px-0 py-0"
          )}
          onInput={handleInput}
        />
      </div>
    </div>
  );
}
