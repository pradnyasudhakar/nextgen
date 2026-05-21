"use client";

import { useEffect, useRef, useState } from "react";
import { X, Link } from "lucide-react";

interface Props {
  selectedText: string;
  onInsert: (markdown: string) => void;
  onClose: () => void;
}

export default function LinkInsertPopup({ selectedText, onInsert, onClose }: Props) {
  const [url, setUrl] = useState("");
  const [text, setText] = useState(selectedText);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleInsert = () => {
    if (!url.trim()) return;
    onInsert(`[${text || url}](${url})`);
    onClose();
  };

  const inputCls =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white/85 placeholder-white/20 outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 transition-all";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm mx-4 rounded-xl border border-white/[0.08] bg-[#0d1117] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <Link size={14} className="text-emerald-400" />
            Insert link
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-white/30 mb-1.5">
              URL *
            </label>
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsert()}
              placeholder="https://example.com"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-white/30 mb-1.5">
              Link text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsert()}
              placeholder="Display text (optional)"
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-white/40 hover:text-white/70 hover:bg-white/[0.05] border border-white/[0.06] transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!url.trim()}
            onClick={handleInsert}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-400 text-[#070a0f] hover:bg-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}