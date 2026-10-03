"use client";

import { useEffect, useState } from "react";

/** Thin bar under the header showing how far through the tutorial you are. */
export function ReadingProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-transparent" aria-hidden="true">
      <div className="h-full origin-left bg-rec" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
