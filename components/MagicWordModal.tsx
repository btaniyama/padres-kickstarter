"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BILLIONAIRE_JOKES } from "@/lib/billionaire-jokes";
import { MAGIC_WORD_MEDIA_PATH } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function MagicWordModal({
  open,
  onClose,
  className,
}: {
  open: boolean;
  onClose: () => void;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [jokeLine, setJokeLine] = useState<string>(BILLIONAIRE_JOKES[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    setJokeLine(
      BILLIONAIRE_JOKES[
        Math.floor(Math.random() * BILLIONAIRE_JOKES.length)
      ],
    );
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="magic-word-title"
      onClick={onClose}
    >
      <div
        className="max-w-md overflow-hidden rounded-2xl border border-white/15 bg-stone-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-white/10 px-4 py-3">
          <p
            id="magic-word-title"
            className="font-heading text-center text-[15px] font-semibold leading-snug tracking-tight text-white"
          >
            {jokeLine}
          </p>
        </div>
        <div className="bg-black">
          {/* GIF file, not MP4 — use img (see constants). */}
          <img
            src={MAGIC_WORD_MEDIA_PATH}
            alt=""
            width={400}
            height={225}
            className="mx-auto block h-auto w-full max-h-[min(50vh,360px)] object-contain"
          />
        </div>
        <div className="flex justify-center border-t border-white/10 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-padres-gold px-4 py-2 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-padres-gold-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Try a smaller pledge
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
