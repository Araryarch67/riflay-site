"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { showSnackbar } from "./Snackbar";

/** An M3-styled code field with a copy icon button. */
export function CopySnippet({ code, label }: { code: string; label?: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    showSnackbar("Copied to clipboard");
    window.setTimeout(() => setDone(false), 1800);
  }

  return (
    <div className="snippet">
      {label && <span className="snippet__label label-medium">{label}</span>}
      <code tabIndex={0}>{code}</code>
      <button
        type="button"
        className={`icon-btn icon-btn--sm copy${done ? " is-done" : ""}`}
        aria-label={`Copy: ${code}`}
        onClick={copy}
      >
        <Icon name={done ? "check" : "content_copy"} />
      </button>
    </div>
  );
}
