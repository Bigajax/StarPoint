"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Toast = { id: number; message: string };

/** Dispara um toast de qualquer componente client. */
export function toast(message: string) {
  window.dispatchEvent(
    new CustomEvent("sp:toast", { detail: { message } })
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let id = 0;
    const onToast = (e: Event) => {
      const { message } = (e as CustomEvent<{ message: string }>).detail;
      const t = { id: ++id, message };
      setToasts((prev) => [...prev, t]);
      setTimeout(
        () => setToasts((prev) => prev.filter((x) => x.id !== t.id)),
        2800
      );
    };
    window.addEventListener("sp:toast", onToast);
    return () => window.removeEventListener("sp:toast", onToast);
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 left-1/2 z-[70] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.p
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="rounded-lg bg-ink px-4 py-3 text-center text-sm font-semibold text-paper shadow-xl"
          >
            <span className="mr-1.5 text-star" aria-hidden>★</span>
            {t.message}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}
