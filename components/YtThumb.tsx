"use client";

import { useState } from "react";

/**
 * YouTube thumbnail with graceful fallbacks.
 * Tries maxres, then 720p, then the standard frame (cropped to hide letterbox bars).
 */
export default function YtThumb({
  id,
  alt,
  vertical = false,
  className = "",
}: {
  id: string;
  alt: string;
  vertical?: boolean;
  className?: string;
}) {
  const order = vertical
    ? ["hq720.jpg", "hqdefault.jpg"]
    : ["maxresdefault.jpg", "hq720.jpg", "hqdefault.jpg"];
  const [i, setI] = useState(0);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://img.youtube.com/vi/${id}/${order[i]}`}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setI((n) => Math.min(n + 1, order.length - 1))}
      className={`absolute inset-0 w-full h-full object-cover ${i === order.length - 1 && !vertical ? "scale-[1.34]" : ""} ${className}`}
    />
  );
}
