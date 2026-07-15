"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Venue = {
  slug: string;
  name: string;
  href: string;
  cover: string;
  logo: string;
  logoAlt: string;
  desc: string;
  addr: string;
  gesture: "birds" | "shine" | "wine";
};

const venues: Venue[] = [
  {
    slug: "ptashka",
    name: "Ранняя пташка",
    href: "https://www.instagram.com/ptashka_coffee/",
    cover: "/cover/ptashka.jpg",
    logo: "/logo/ptashka.png",
    logoAlt: "ранняя пташка",
    desc: "Завтраки, бейглы и спешалти-кофе с раннего утра",
    addr: "Астрономическая, 17",
    gesture: "birds",
  },
  {
    slug: "yasniy",
    name: "Ясный",
    href: "https://www.instagram.com/yasniybar/",
    cover: "/cover/yasniu.jpg",
    logo: "/logo/yisniy.png",
    logoAlt: "Ясный",
    desc: "Батч-бар: безлимитный фильтр и своя пекарня",
    addr: "Островского, 9",
    gesture: "shine",
  },
  {
    slug: "melok",
    name: "Мелок",
    href: "https://www.instagram.com/melok.bar/",
    cover: "/cover/melok.jpg",
    logo: "/logo/melok.png",
    logoAlt: "Мелок",
    desc: "Винный бар с характером и летним двором",
    addr: "Кави Наджми, 8а",
    gesture: "wine",
  },
];

function Gesture({ kind }: { kind: Venue["gesture"] }) {
  if (kind === "birds") {
    return (
      <div className="gesture-birds" aria-hidden>
        {["bird", "bird bird--2", "bird bird--3"].map((cls) => (
          <svg key={cls} className={cls} viewBox="0 0 32 14" fill="none">
            <path
              d="M2 11 Q8.5 2 16 9.5 Q23.5 2 30 11"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        ))}
      </div>
    );
  }
  if (kind === "shine") {
    return (
      <div className="gesture-shine" aria-hidden>
        <div className="shine-sweep" />
        <svg className="shine-star" viewBox="0 0 24 24">
          <path
            d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="gesture-wine" aria-hidden>
      <div className="wine-layer wine-layer--back" />
      <div className="wine-layer" />
    </div>
  );
}

// В статическом экспорте с unoptimized next/image не префиксует src
// значением basePath — добавляем его вручную и для обложек, и для логотипов
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Triptych() {
  const [active, setActive] = useState<number | null>(null);
  const [intro, setIntro] = useState<number | null>(null);

  // На тач-устройствах ховера нет — при загрузке по очереди проигрываем
  // фирменный жест каждого сегмента (один раз, без зацикливания)
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const step = 1300;
    const timers = [0, 1, 2].map((i) =>
      window.setTimeout(() => setIntro(i), 800 + i * step),
    );
    timers.push(window.setTimeout(() => setIntro(null), 800 + 3 * step));
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleClick =
    (i: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      // На тач-устройствах первый тап раскрывает сегмент, второй — переход
      if (window.matchMedia("(hover: none)").matches && active !== i) {
        e.preventDefault();
        setActive(i);
      }
    };

  return (
    <main className="triptych">
      {venues.map((v, i) => (
        <a
          key={v.slug}
          href={v.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${v.name} — ${v.desc}. ${v.addr}. Перейти`}
          className={[
            "panel",
            active === i ? "is-active" : "",
            active !== null && active !== i ? "is-dimmed" : "",
            intro === i ? "is-intro" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={handleClick(i)}
        >
          <div className="panel__media">
            <Image
              src={`${basePath}${v.cover}`}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 34vw, 100vw"
              className="panel__img"
            />
          </div>
          <div className="panel__scrim" />
          <Gesture kind={v.gesture} />
          <div className="panel__content">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}${v.logo}`}
              alt={v.logoAlt}
              className={
                v.gesture === "shine"
                  ? "panel__logo panel__logo--tall"
                  : "panel__logo"
              }
            />
            <p className="panel__desc">{v.desc}</p>
            <p className="panel__addr">{v.addr}</p>
            <span className="panel__go">
              Перейти
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8 H13 M9 4 L13 8 L9 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </a>
      ))}
    </main>
  );
}
