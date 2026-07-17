"use client";

import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const slides = [
  "slide-1.jpg",
  "slide-2.jpg",
  "slide-3.jpg",
  "slide-4.jpg",
  "slide-5.jpg",
  "slide-6.jpg",
];

export function PhotoPane() {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => {
        setPrev(i);
        return (i + 1) % slides.length;
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <aside className="photo-pane" aria-label="Фотографии заведений">
      {slides.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s}
          src={`${basePath}/photo/${s}`}
          alt=""
          className={
            i === idx
              ? "slide slide--in"
              : i === prev
                ? "slide"
                : "slide slide--hidden"
          }
        />
      ))}
    </aside>
  );
}
