"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export interface RichTextCellProps {
  value: string;
  onChange: (html: string) => void;
  className?: string;
  placeholder?: string;
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

  return (
    <div className={cn("flex flex-1 flex-col min-h-0", className)}>
      <div className="relative min-h-0 flex-1 flex flex-col">
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
            "min-h-[80px] flex-1 w-full h-full border-0 bg-transparent outline-none relative z-10",
            "focus-visible:ring-1 focus-visible:ring-border rounded px-0 py-0"
          )}
          onInput={handleInput}
        />
      </div>
    </div>
  );
}
