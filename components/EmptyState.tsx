"use client";

import Link from "next/link";

export function EmptyState({
  title,
  subtitle,
  actionLabel,
  onAction,
  actionHref,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}) {
  return (
    <div className="rounded-lg bg-cloud px-6 py-16 text-center">
      <p className="display-black text-4xl text-ink/15" aria-hidden>
        ★
      </p>
      <p className="mt-3 text-lg font-bold">{title}</p>
      {subtitle && <p className="mt-1 text-sm text-steel">{subtitle}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-block rounded-lg bg-ink px-6 py-3 font-bold text-paper transition-transform hover:-translate-y-0.5"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-lg bg-ink px-6 py-3 font-bold text-paper transition-transform hover:-translate-y-0.5"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
