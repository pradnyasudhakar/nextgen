"use client";

import { useEffect, useRef, useState } from "react";
import { X, Image, Upload, Link } from "lucide-react";

interface Props {
  onInsert: (markdown: string) => void;
  onClose: () => void;
}

type Tab = "upload" | "url";

export default function ImageInsertPopup({ onInsert, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("upload");
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Max file size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();
      const { url: uploaded } = await res.json();
      setUploadedUrl(uploaded);
    } catch {
      setError("Upload failed. Try again.");
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInsert = () => {
    const finalUrl = tab === "upload" ? uploadedUrl : url.trim();
    if (!finalUrl) return;
    const altText = alt.trim() || "Image";
    onInsert(`![${altText}](${finalUrl})`);
    onClose();
  };

  const canInsert = tab === "upload" ? !!uploadedUrl : !!url.trim();

  const inputCls =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white/85 placeholder-white/20 outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 transition-all";

  const tabCls = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
      active
        ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
        : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm mx-4 rounded-xl border border-white/[0.08] bg-[#0d1117] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <Image size={14} className="text-emerald-400" />
            Insert image
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-4 pt-3">
          <button
            type="button"
            className={tabCls(tab === "upload")}
            onClick={() => setTab("upload")}
          >
            <Upload size={12} /> Upload file
          </button>
          <button
            type="button"
            className={tabCls(tab === "url")}
            onClick={() => setTab("url")}
          >
            <Link size={12} /> Paste URL
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {tab === "upload" ? (
            <>
              <label
                htmlFor="popup-img-upload"
                className={`flex flex-col items-center justify-center gap-2 w-full h-32 rounded-lg border-2 border-dashed cursor-pointer transition-all
                  ${preview ? "border-emerald-400/30 bg-emerald-400/5" : "border-white/[0.10] bg-white/[0.02] hover:border-emerald-400/30 hover:bg-white/[0.04]"}
                  relative overflow-hidden`}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="relative z-10 text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded">
                      {isUploading ? "Uploading…" : "✓ Ready — click to change"}
                    </div>
                  </>
                ) : (
                  <>
                    <Upload size={20} className="text-white/25" />
                    <span className="text-[11px] font-mono text-white/25">
                      Click to choose image
                    </span>
                    <span className="text-[9px] font-mono text-white/15">
                      JPG, PNG, WEBP — max 5MB
                    </span>
                  </>
                )}
                <input
                  id="popup-img-upload"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {isUploading && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full animate-pulse w-2/3" />
                  </div>
                  <span className="text-[10px] font-mono text-white/30">
                    Uploading…
                  </span>
                </div>
              )}
            </>
          ) : (
            <div>
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-white/30 mb-1.5">
                Image URL *
              </label>
              <input
                type="url"
                value={url}
                autoFocus
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInsert()}
                placeholder="https://example.com/photo.jpg"
                className={inputCls}
              />
              {url && (
                <img
                  src={url}
                  alt="preview"
                  className="mt-2 w-full h-24 object-cover rounded-lg border border-white/[0.06] opacity-70"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>
          )}

          <div>
            <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-white/30 mb-1.5">
              Alt text / caption
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsert()}
              placeholder="Describe the image…"
              className={inputCls}
            />
          </div>

          {error && (
            <p className="text-[11px] font-mono text-red-400/80 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
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
            disabled={!canInsert || isUploading}
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
