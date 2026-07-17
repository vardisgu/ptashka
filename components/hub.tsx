// В статическом экспорте с unoptimized next/image не префиксует src
// значением basePath — добавляем его вручную
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Venue = {
  slug: string;
  name: string;
  href: string;
  logo: string;
  logoAlt: string;
  logoClass: string;
  meta: string;
  doodle: "bagel" | "coffee" | "wine";
  doodleSide: "left" | "right";
};

const venues: Venue[] = [
  {
    slug: "ptashka",
    name: "Ранняя пташка",
    href: "https://www.instagram.com/ptashka_coffee/",
    logo: "/logo/ptashka.svg",
    logoAlt: "ранняя пташка",
    logoClass: "row__logo",
    meta: "кофейня — завтраки весь день — астрономическая, 17",
    doodle: "bagel",
    doodleSide: "right",
  },
  {
    slug: "yasniy",
    name: "Ясный",
    href: "https://www.instagram.com/yasniybar/",
    logo: "/logo/yisniy.svg",
    logoAlt: "Ясный",
    logoClass: "row__logo row__logo--tall",
    meta: "батч-бар — безлимитный фильтр — островского, 9",
    doodle: "coffee",
    doodleSide: "left",
  },
  {
    slug: "melok",
    name: "Мелок",
    href: "https://www.instagram.com/melok.bar/",
    logo: "/logo/melok.svg",
    logoAlt: "Мелок",
    logoClass: "row__logo row__logo--compact",
    meta: "винный бар — кухня и события — кави наджми, 8а",
    doodle: "wine",
    doodleSide: "right",
  },
];

function BagelDoodle() {
  return (
    <svg viewBox="0 0 120 120" className="row__doodle doodle doodle--bagel" aria-hidden>
      <g className="bagel-rock">
        <path
          className="d d1"
          pathLength={1}
          d="M60 34 C86 34 103 46 103 63 C103 80 84 92 60 92 C36 92 17 80 17 63 C17 46 34 34 60 34 Z"
        />
        <path
          className="d d2"
          pathLength={1}
          d="M60 54 C69 54 76 58 76 63 C76 68 69 72 60 72 C51 72 44 68 44 63 C44 58 51 54 60 54 Z"
        />
        <path
          className="d d3 thin"
          pathLength={1}
          d="M38 47 l6 -3 M64 41 l7 -1 M84 50 l6 3 M30 60 l-7 1 M89 66 l7 2"
        />
      </g>
    </svg>
  );
}

function CoffeeDoodle() {
  return (
    <svg viewBox="0 0 120 120" className="row__doodle doodle doodle--coffee" aria-hidden>
      <path className="steam s1 thin" pathLength={1} d="M48 44 C44 37 52 32 48 24" />
      <path className="steam s2 thin" pathLength={1} d="M64 44 C60 37 68 32 64 24" />
      <g className="star-wrap">
        <path
          className="d d3 thin"
          pathLength={1}
          d="M88 22 l0 12 M82 28 l12 0 M84 24 l8 8 M92 24 l-8 8"
        />
      </g>
      <path
        className="d d1"
        pathLength={1}
        d="M34 56 L86 56 C86 76 78 90 60 90 C42 90 34 76 34 56 Z"
      />
      <path className="d d2" pathLength={1} d="M86 61 C96 59 98 74 84 77" />
      <path className="d d2" pathLength={1} d="M30 98 C42 104 78 104 90 98" />
    </svg>
  );
}

function WineDoodle() {
  return (
    <svg viewBox="0 0 120 120" className="row__doodle doodle doodle--wine" aria-hidden>
      <g transform="translate(100 24) rotate(-120)">
        <g className="bottle-tilt">
          <path
            className="d d1"
            pathLength={1}
            d="M-6 14 C-6 16.5 6 16.5 6 14 L6 0 C6 -4 2.5 -5.5 2.5 -8.5 L2.5 -14 L-2.5 -14 L-2.5 -8.5 C-2.5 -5.5 -6 -4 -6 0 Z"
          />
        </g>
      </g>
      <path className="pour thin" pathLength={1} d="M87 33 C84 41 82 49 81 56" />
      <path
        className="d d2"
        pathLength={1}
        d="M56 58 L100 58 C100 74 92 84 78 84 C64 84 56 74 56 58 Z"
      />
      <path className="wine-level thin" pathLength={1} d="M62 68 C68 71 88 71 94 68" />
      <path className="d d3" pathLength={1} d="M78 84 L78 100 M64 104 L92 104" />
    </svg>
  );
}

const doodles = {
  bagel: BagelDoodle,
  coffee: CoffeeDoodle,
  wine: WineDoodle,
};

export function Hub() {
  return (
    <div className="page">
      <header className="top">
        <span>одна команда — три места</span>
        <span>казань</span>
      </header>

      <main className="rows">
        {venues.map((v, i) => {
          const Doodle = doodles[v.doodle];
          return (
            <a
              key={v.slug}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${v.name} — ${v.meta}`}
              className={`row row--${i + 1}`}
            >
              {v.doodleSide === "left" && <Doodle />}
              <span className="row__stack">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${basePath}${v.logo}`} alt={v.logoAlt} className={v.logoClass} />
                <span className="row__meta">{v.meta}</span>
              </span>
              {v.doodleSide === "right" && <Doodle />}
            </a>
          );
        })}
      </main>
    </div>
  );
}
