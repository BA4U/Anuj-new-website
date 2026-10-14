"use client";

import { useState, type ReactNode } from "react";
import VideoModal from "@/components/VideoModal";

export default function PlayWrap({ id, title, vertical, className = "", children }: { id: string; title: string; vertical?: boolean; className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`Play ${title}`} className={`text-left w-full ${className}`}>
        {children}
      </button>
      {open && <VideoModal id={id} vertical={vertical} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}
