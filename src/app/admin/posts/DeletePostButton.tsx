"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeletePostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      router.refresh();
    });
  }

  if (confirm) {
    return (
      <span className="flex items-center gap-2">
        <button
          id={`confirm-delete-${id}`}
          onClick={handleDelete}
          disabled={isPending}
          className="font-mono text-[11px] text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors duration-150"
        >
          {isPending ? "…" : "Yes"}
        </button>
        <button
          id={`cancel-delete-${id}`}
          onClick={() => setConfirm(false)}
          className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors duration-150"
        >
          No
        </button>
      </span>
    );
  }

  return (
    <button
      id={`delete-post-${id}`}
      onClick={() => setConfirm(true)}
      title={`Delete "${title}"`}
      className="font-mono text-[11px] text-white/25 hover:text-red-400 transition-colors duration-150"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
