"use client";

import { useEffect, useState } from "react";

type CopyStatus = "idle" | "copying" | "copied" | "error";

export function CopyContactEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    if (status !== "copied") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 2500);
    return () => window.clearTimeout(timeout);
  }, [status]);

  async function copyEmail() {
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bti-contact-copy">
      <button
        type="button"
        onClick={copyEmail}
        disabled={status === "copying"}
        aria-describedby="contact-copy-status"
      >
        {status === "copied" ? "Copied" : "Copy email"}
        <svg
          className="bti-contact-copy-icon"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={status === "copied" ? "M1 6.5 4.5 10 11 2" : "M6 1v10M1 6h10"}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </button>
      <span
        id="contact-copy-status"
        className={status === "error" ? "bti-contact-copy-error" : "sr-only"}
        role="status"
      >
        {status === "copied"
          ? "Email address copied."
          : status === "error"
            ? `Couldn’t copy. Select ${email} above, or use the email link.`
            : ""}
      </span>
    </div>
  );
}
