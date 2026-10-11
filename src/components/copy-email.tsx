"use client";

import { useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:bg-surface-2"
    >
      {copied ? <LuCheck className="size-4 text-accent" aria-hidden="true" /> : <LuCopy className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
    </button>
  );
}
