"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { Code, Image, Link, List, ListOrdered, Quote } from "lucide-react";
import LinkInsertPopup from "../editor/LinkInsertPopup";
import ImageInsertPopup from "../editor/ImageInsertPopup";

type Mode = "create" | "edit";

interface PostFormProps {
  mode: Mode;
  initialData?: {
    id: string;
    title: string;
    smallTitle?: string;
    writerName?: string;
    postedDate?: string | Date;
    readTime?: number;
    slug: string;
    description?: string | null; 
    excerpt?: string | null;
    content: string;
    coverImage?: string | null;
    published: boolean;
    faqs?: { question: string; answer: string }[];
  };
}

export default function PostForm({ mode, initialData }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [smallTitle, setSmallTitle] = useState(initialData?.smallTitle ?? "");
  const [writerName, setWriterName] = useState(initialData?.writerName ?? "Admin");

  const initialDateStr = initialData?.postedDate
    ? new Date(initialData.postedDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  const [postedDate, setPostedDate] = useState(initialDateStr);
  const [readTime, setReadTime] = useState<number>(initialData?.readTime ?? 2);

  const [description, setDescription] = useState(initialData?.description ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? "");
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(
    initialData?.faqs ?? []
  );

  const [isPreview, setIsPreview] = useState(false);
  const [showMoreToolbar, setShowMoreToolbar] = useState(false);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);

  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    setFaqs(faqs.map((faq, i) => i === index ? { ...faq, [field]: value } : faq));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const { url } = await res.json();
      setCoverImage(url);
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const insertFormatting = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = before + selected + after;

    setContent(text.substring(0, start) + replacement + text.substring(end));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length,
      );
    }, 50);
  };

  const renderPreview = (text: string) => {
    if (!text)
      return <p className="text-white/20 italic">Nothing to preview yet...</p>;

    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    html = html.replace(
      /^### (.*?)$/gm,
      '<h3 class="text-lg font-bold text-white/95 mt-4 mb-2">$1</h3>',
    );
    html = html.replace(
      /^## (.*?)$/gm,
      '<h2 class="text-xl font-bold text-white/95 mt-6 mb-3">$1</h2>',
    );
    html = html.replace(
      /^# (.*?)$/gm,
      '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>',
    );

    html = html.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-extrabold text-white">$1</strong>',
    );
    html = html.replace(
      /\*(.*?)\*/g,
      '<em class="italic text-white/90">$1</em>',
    );
    html = html.replace(
      /__(.*?)__/g,
      '<u class="underline decoration-emerald-400/40">$1</u>',
    );

    html = html.replace(
      /^> (.*?)$/gm,
      '<blockquote class="border-l-4 border-emerald-400 bg-white/2 px-4 py-2 my-4 italic text-white/70">$1</blockquote>',
    );

    html = html.replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-black/40 border border-white/6 rounded-lg p-4 font-mono text-[13px] text-emerald-300 overflow-x-auto my-4">$1</pre>',
    );
    html = html.replace(
      /`([^`\n]+)`/g,
      '<code class="bg-white/8 px-1.5 py-0.5 rounded font-mono text-emerald-300 text-[13px]">$1</code>',
    );

    html = html.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<div class="my-6 text-center"><img src="$2" alt="$1" class="rounded-xl border border-white/8 max-h-100 mx-auto object-cover shadow-2xl" /></div>',
    );

    html = html.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-400 underline hover:text-emerald-300 transition-colors">$1</a>',
    );

    html = html.replace(
      /^\- (.*?)$/gm,
      '<li class="ml-4 list-disc text-white/80 my-1">$1</li>',
    );

    html = html.replace(
      /^\d+\. (.*?)$/gm,
      '<li class="ml-4 list-decimal text-white/80 my-1">$1</li>',
    );

    const paragraphs = html.split("\n\n").map((p) => {
      if (
        p.trim().startsWith("<li") ||
        p.trim().startsWith("<h") ||
        p.trim().startsWith("<blockquote") ||
        p.trim().startsWith("<pre") ||
        p.trim().startsWith("<div")
      ) {
        return p;
      }
      return '<p class="leading-relaxed text-sm text-white/75 my-3">' + p.replace(/\n/g, "<br />") + "</p>";
    });

    return (
      <div
        className="prose prose-invert max-w-none space-y-4"
        dangerouslySetInnerHTML={{ __html: paragraphs.join("\n") }}
      />
    );
  };

  const openLinkPopup = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const sel = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd,
    );
    setSelectedText(sel);
    setShowLinkPopup(true);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      title,
      smallTitle,
      writerName,
      postedDate: new Date(postedDate).toISOString(),
      readTime: parseInt(readTime.toString(), 10),
      description,
      excerpt,
      content,
      coverImage,
      published,
      faqs,
    };

    startTransition(async () => {
      try {
        const res =
          mode === "create"
            ? await fetch("/api/admin/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              })
            : await fetch(`/api/admin/posts/${initialData!.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error ?? "Something went wrong.");
          return;
        }

        setSuccess(true);
        setTimeout(() => router.push("/admin/posts"), 900);
      } catch {
        setError("Network error. Please try again.");
      }
    });
  }

  const inputCls =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white/85 placeholder-white/20 outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-150";
  const labelCls =
    "block font-mono text-[10px] tracking-[0.18em] uppercase text-white/35 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className={labelCls}>Small Title / Category *</label>
            <input
              id="post-small-title"
              type="text"
              value={smallTitle}
              onChange={(e) => setSmallTitle(e.target.value)}
              placeholder="e.g. Technology, Finance, Travel..."
              required
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Big Title *</label>
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter main headline here..."
              required
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Writer Name *</label>
            <input
              id="post-writer-name"
              type="text"
              value={writerName}
              onChange={(e) => setWriterName(e.target.value)}
              placeholder="Author's name..."
              required
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Posted Date *</label>
            <input
              id="post-posted-date"
              type="date"
              value={postedDate}
              onChange={(e) => setPostedDate(e.target.value)}
              required
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Read Time (Minutes) *</label>
            <input
              id="post-read-time"
              type="number"
              min="1"
              value={readTime}
              onChange={(e) => setReadTime(parseInt(e.target.value, 10) || 2)}
              required
              className={inputCls}
            />
          </div>
        </div>
      </div>

      <hr className="border-white/[0.06]" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label className={labelCls}>Cover Image</label>
          <label
            htmlFor="cover-upload"
            className={
              "flex flex-col items-center justify-center gap-2 w-full h-32 rounded-lg border-2 border-dashed border-white/[0.12] bg-white/[0.02] cursor-pointer hover:border-emerald-400/40 hover:bg-white/[0.04] transition-all duration-150 group relative overflow-hidden" +
              (coverImage ? " border-emerald-400/30" : "")
            }
          >
            {coverImage ? (
              <>
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded">
                    Uploaded - click to change
                  </span>
                </div>
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6 text-white/25 group-hover:text-emerald-400/60 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[11px] font-mono text-white/25 group-hover:text-white/50 transition-colors">
                  Click to upload image
                </span>
                <span className="text-[9px] font-mono text-white/15">
                  JPG, PNG, WEBP - max 5MB
                </span>
              </>
            )}
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {isUploading && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full animate-pulse w-2/3" />
              </div>
              <span className="text-[10px] font-mono text-white/30">Uploading...</span>
            </div>
          )}

          {coverImage && !isUploading && (
            <button
              type="button"
              onClick={() => setCoverImage("")}
              className="mt-1.5 text-[10px] font-mono text-white/25 hover:text-red-400/70 transition-colors"
            >
              Remove image
            </button>
          )}
        </div>
        
  {/* Description */}
          <div className="md:col-span-2">
            <label className={labelCls}>Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Intro description shown above the quote block..."
              className={inputCls + " resize-none"}
            />
          </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Excerpt / Meta Description</label>
          <textarea
            id="post-excerpt"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short introductory summary for post listings..."
            className={inputCls + " resize-none"}
          />
        </div>
      
      </div>

      <div className="space-y-2">
        <label className={labelCls}>Content *</label>
        <div className="rounded-xl border border-white/[0.08] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className="relative">
                <select
                  aria-label="Add heading format"
                  onChange={(e) => {
                    if (e.target.value === "h1") insertFormatting("\n# ", "\n");
                    if (e.target.value === "h2") insertFormatting("\n## ", "\n");
                    // if (e.target.value === "h3") insertFormatting("\n### ", "\n");
                    // if (e.target.value === "h4") insertFormatting("\n#### ", "\n");
                    // if (e.target.value === "h5") insertFormatting("\n##### ", "\n");
                    if (e.target.value === "h6") insertFormatting("\n###### ", "\n");
                    e.target.value = "";
                  }}
                  className="rounded border border-white/[0.20] text-xs bg-[#000000] px-2 py-1.5 cursor-pointer outline-none focus:border-emerald-400/50"
                >
                  <option value="">Add a title</option>
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  {/* <option value="h3">H3</option> */}
                  {/* <option value="h4">H4</option> */}
                  {/* <option value="h5">H5</option> */}
                  <option value="h6">H6</option>
                </select>
              </div>

              <div className="h-4 w-[1px] mx-1" />

              <button type="button" onClick={() => insertFormatting("**", "**")} title="Bold" className="w-8 h-8 rounded hover:bg-white/[0.06] flex items-center justify-center font-bold text-sm text-white/80 active:scale-95 transition-all">B</button>
              <button type="button" onClick={() => insertFormatting("*", "*")} title="Italic" className="w-8 h-8 rounded hover:bg-white/[0.06] flex items-center justify-center italic text-sm text-white/80 active:scale-95 transition-all">I</button>
              {/* <button type="button" onClick={() => insertFormatting("__", "__")} title="Underline" className="w-8 h-8 rounded hover:bg-white/[0.06] flex items-center justify-center underline text-sm text-white/80 active:scale-95 transition-all">U</button> */}

              <button
                type="button"
                onClick={() => setShowMoreToolbar((s) => !s)}
                className={
                  "w-8 h-8 rounded hover:bg-white/[0.06] cursor-pointer flex items-center justify-center text-xs font-bold transition-all " +
                  (showMoreToolbar ? "bg-white/[0.1] text-emerald-400" : "text-white/40")
                }
              >
                ...
              </button>

              {showMoreToolbar && (
                <div className="flex items-center gap-4 bg-[#090e15] border border-white/[0.08] rounded px-1.5 py-2">
                  <button type="button" onClick={() => insertFormatting("- ", "")} title="Bullet list" className="w-5 h-5 rounded hover:bg-white/[0.08] text-white/70"><List /></button>
                  {/* <button type="button" onClick={() => insertFormatting("1. ", "")} title="Numbered list" className="w-5 h-5 rounded hover:bg-white/[0.08] flex items-center justify-center text-white/70"><ListOrdered /></button> */}
                  <button type="button" onClick={() => insertFormatting("`", "`")} title="Code" className="w-5 h-5 rounded hover:bg-white/[0.08] flex items-center justify-center text-emerald-400"><Code /></button>
                  <button type="button" onClick={openLinkPopup} title="Insert Link" className="w-5 h-5 rounded hover:bg-white/[0.08] flex items-center justify-center text-emerald-400"><Link /></button>
                  <button type="button" onClick={() => setShowImagePopup(true)} title="Insert Image" className="w-5 h-5 rounded hover:bg-white/[0.08] flex items-center justify-center text-emerald-400"><Image /></button>
                  {/* <button type="button" onClick={() => insertFormatting("> ", "")} title="Blockquote" className="w-5 h-5 rounded hover:bg-white/[0.08] flex items-center justify-center text-white/70"><Quote /></button> */}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider font-mono border transition-all duration-150 " +
                (isPreview
                  ? "bg-emerald-400 text-[#070a0f] border-emerald-400"
                  : "bg-white/[0.04] text-white/60 border-white/[0.08] hover:bg-white/[0.08] hover:text-white")
              }
            >
              {isPreview ? "Edit mode" : "Preview mode"}
            </button>
          </div>

          <div className="relative min-h-[350px] flex">
            {isPreview ? (
              <div className="w-full p-6 overflow-y-auto bg-white/[0.005] max-h-[500px]">
                {renderPreview(content)}
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content here..."
                required
                className="w-full min-h-[350px] bg-transparent p-6 outline-none text-white/80 placeholder-white/10 font-mono text-[13.5px] leading-relaxed resize-y"
              />
            )}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className={labelCls}>FAQs</label>
          <button
            type="button"
            onClick={addFaq}
            className="px-3 py-1.5 rounded-lg bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 font-mono text-xs hover:bg-emerald-400/20 transition-all"
          >
            + Add FAQ
          </button>
        </div>

        {faqs.length === 0 && (
          <p className="text-white/20 font-mono text-xs italic">No FAQs added yet.</p>
        )}

        {faqs.map(function(faq, i) {
          return (
            <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">FAQ {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="text-[10px] font-mono text-red-400/50 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                placeholder="Question"
                value={faq.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)}
                className={inputCls}
              />
              <textarea
                rows={3}
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) => updateFaq(i, "answer", e.target.value)}
                className={inputCls + " resize-none"}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 bg-white/[0.015] border border-white/[0.04] w-fit px-4 py-2.5 rounded-xl">
        <button
          id="post-published-toggle"
          type="button"
          onClick={() => setPublished((p) => !p)}
          className={
            "relative inline-flex h-5.5 w-10 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 " +
            (published ? "bg-emerald-400" : "bg-white/10")
          }
        >
          <span
            className={
              "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 " +
              (published ? "translate-x-5.5" : "translate-x-0.5")
            }
          />
        </button>
        <span className="font-mono text-xs text-white/60">
          Status:{" "}
          <span className={published ? "text-emerald-400 font-bold" : "text-white/30"}>
            {published ? "Published" : "Draft"}
          </span>
        </span>
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 font-mono text-xs text-red-400">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 font-mono text-xs text-emerald-400">
          {mode === "create" ? "Post created successfully!" : "Changes saved successfully!"} Redirecting...
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          id="post-submit"
          type="submit"
          disabled={isPending || success}
          className="px-6 py-2.5 rounded-lg cursor-pointer bg-emerald-400 text-[#070a0f] font-bold text-sm hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-lg shadow-emerald-400/5"
        >
          {isPending
            ? mode === "create" ? "Creating Post..." : "Saving Changes..."
            : mode === "create" ? "Create Post" : "Save Changes"}
        </button>
        <button
          id="post-cancel"
          type="button"
          onClick={() => router.push("/admin/posts")}
          className="px-5 py-2.5 rounded-lg border cursor-pointer border-white/[0.08] bg-white/[0.03] text-white/50 font-mono text-sm hover:text-white/85 hover:bg-white/[0.06] transition-all duration-150"
        >
          Cancel
        </button>
      </div>

      {showLinkPopup && (
        <LinkInsertPopup
          selectedText={selectedText}
          onInsert={(md) => insertFormatting(md)}
          onClose={() => setShowLinkPopup(false)}
        />
      )}

      {showImagePopup && (
        <ImageInsertPopup
          onInsert={(md) => insertFormatting(md)}
          onClose={() => setShowImagePopup(false)}
        />
      )}
    </form>
  );
}