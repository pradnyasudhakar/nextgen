"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // purane browsers ke liye fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy blog link"
        className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-[#9C9C9C] transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <Link2 className="w-4 h-4 text-white" />
        )}
      </button>
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white">
          Link copied!
        </span>
      )}
    </div>
  );
}