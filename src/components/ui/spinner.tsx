import { cn } from "@/lib/utils";
import React from "react";

export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-6 w-6 animate-spin", className)}
      viewBox="0 0 100 100"
    >
      <circle
        className="stroke-current opacity-40"
        cx="50"
        cy="50"
        fill="none"
        r="40"
        strokeWidth="10"
      />
      <circle
        className="stroke-current"
        cx="50"
        cy="50"
        fill="none"
        r="40"
        strokeDasharray="250"
        strokeDashoffset="210"
        strokeWidth="10"
      />
    </svg>
  );
}
