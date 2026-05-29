"use client";

import { useState } from "react";

type FeedbackActionButtonProps = {
  label: string;
  message: string;
  variant?: "primary" | "secondary" | "danger";
};

const variantClasses = {
  primary: "bg-navy text-white hover:bg-navy-dark",
  secondary: "border border-border bg-white text-navy hover:bg-slate-50",
  danger: "bg-red-700 text-white hover:bg-red-800"
};

export function FeedbackActionButton({ label, message, variant = "primary" }: FeedbackActionButtonProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <button
        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${variantClasses[variant]}`}
        type="button"
        onClick={() => setFeedback(message)}
      >
        {label}
      </button>
      {feedback ? <p className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{feedback}</p> : null}
    </div>
  );
}
