"use client";

import { useEffect, useState } from "react";

const EVENT = "riflay:snackbar";

export function showSnackbar(message: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: message }));
}

/** M3 snackbar: one line on the inverse surface, announced politely. */
export function Snackbar() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const onShow = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setVisible(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(false), 2400);
    };
    window.addEventListener(EVENT, onShow);
    return () => {
      window.removeEventListener(EVENT, onShow);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`snackbar${visible ? " is-visible" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
