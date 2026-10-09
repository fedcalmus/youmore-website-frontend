"use client";

import { useRef, useState } from "react";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard unavailable — ignore, button still gives feedback
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button type="button" className="cp" aria-label={label} onClick={handleClick}>
      {copied ? "Copiato" : "Copia"}
    </button>
  );
}
