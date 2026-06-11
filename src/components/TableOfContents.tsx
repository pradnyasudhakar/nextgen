"use client";

import { useEffect, useState } from "react";

type Item = { text: string; id: string };

export default function TableOfContents({ items }: { items: Item[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    items.forEach(function({ id }) {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        function([entry]) { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return function() { observers.forEach(function(o) { o.disconnect(); }); };
  }, [items]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  if (items.length === 0) return null;

  return (
    <div className="border border-[#9C9C9C] border-t-4 border-t-primary shadow-md bg-[#FBFBFB] rounded-[5px] p-4">
      
      <h3 className="text-base font-bold text-[#1a1a1a] mb-3">Table Of Content</h3>
      <ol className="space-y-2 list-none">
        {items.map(function(item, i) {
          const isActive = activeId === item.id;
          const numClass = isActive
            ? "shrink-0 font-[700] text-[#00674E]"
            : "shrink-0  text-[#555555] hover:text-dark";
          const linkClass = isActive
            ? "text-[#00674E] font-[700] "
            : "text-[#555555] hover:text-dark";
          return (
            <li key={i} className="flex gap-2 text-sm cursor-pointer">
              <span className={numClass}>{i + 1}.</span>
              <a
                href={"#" + item.id}
                onClick={function(e) { handleClick(e, item.id); }}
                className={linkClass}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}