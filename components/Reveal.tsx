"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Entrada suave ao rolar — fade + leve deslocamento, rápida e discreta. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  // `initial` é constante para não divergir entre servidor e cliente;
  // com reduced motion a transição vira instantânea.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.45, delay, ease: "easeOut" }
      }
    >
      {children}
    </motion.div>
  );
}
