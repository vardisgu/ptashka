import { PhotoPane } from "@/components/photo-pane";

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
    logoClass: "row__logo row__logo--wordmark",
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
    meta: "днём — бистро, вечером — вино — кави наджми, 8а",
    doodle: "wine",
    doodleSide: "right",
  },
];

function BagelDoodle() {
  return (
    <svg viewBox="0 0 120 120" className="row__doodle doodle doodle--bagel" aria-hidden>
      <g className="bagel-rock">
        {/* верхняя половинка с намёком на дырку */}
        <path
          className="d d1"
          pathLength={1}
          d="M20 54 C17 38 38 27 60 27 C82 27 103 38 100 54"
        />
        <path className="d d2 thin" pathLength={1} d="M54 31 q6 -4 12 0" />
        {/* начинка — волнистые слои */}
        <path
          className="d d2 thin"
          pathLength={1}
          d="M20 58 q7 7 14 0 q7 -7 14 0 q7 7 14 0 q7 -7 14 0 q7 7 14 0 q7 -7 10 3"
        />
        <path className="d d2 thin" pathLength={1} d="M28 66 q8 5 18 2 M62 68 q10 3 20 -2" />
        {/* нижняя половинка */}
        <path
          className="d d1"
          pathLength={1}
          d="M24 72 C24 82 40 89 60 89 C80 89 96 82 96 72"
        />
        {/* кунжут */}
        <path
          className="d d3 thin"
          pathLength={1}
          d="M34 38 l6 -3 M52 32 l6 -1 M72 33 l6 2 M87 42 l6 3 M43 34 l4 -3"
        />
      </g>
    </svg>
  );
}

function CoffeeDoodle() {
  return (
    <svg viewBox="0 0 120 120" className="row__doodle doodle doodle--coffee" aria-hidden>
      <path className="steam s1 thin" pathLength={1} d="M44 44 C40 37 48 32 44 24" />
      <path className="steam s2 thin" pathLength={1} d="M58 42 C54 34 62 29 58 20" />
      <path className="steam s3 thin" pathLength={1} d="M72 44 C68 37 76 32 72 24" />
      <g className="star-wrap">
        <path
          className="d d3 thin"
          pathLength={1}
          d="M92 20 l0 12 M86 26 l12 0 M88 22 l8 8 M96 22 l-8 8"
        />
      </g>
      <path className="d d3 thin" pathLength={1} d="M103 38 l0 6 M100 41 l6 0" />
      {/* чашка с поверхностью кофе */}
      <path
        className="d d1"
        pathLength={1}
        d="M32 56 L84 56 C84 76 76 90 58 90 C40 90 32 76 32 56 Z"
      />
      <path className="d d2 thin" pathLength={1} d="M38 62 C44 66 72 66 78 62" />
      <path className="d d2" pathLength={1} d="M84 61 C94 59 96 74 82 77" />
      {/* блюдце и ложка */}
      <path className="d d2" pathLength={1} d="M26 97 C38 103 78 103 90 97" />
      <path className="d d3 thin" pathLength={1} d="M93 96 c7 -1 12 -4 16 -8 M106 85 q4 2 3 5 q-1 3 -5 2" />
    </svg>
  );
}

function WineDoodle() {
  return (
    <svg viewBox="0 0 120 120" className="row__doodle doodle doodle--wine" aria-hidden>
      {/* бутылка: стоит на столе, поднимается и наклоняется над бокалом */}
      <g className="bottle-pos">
        <g className="bottle-rot">
          <path
            className="d d1"
            pathLength={1}
            d="M-6 14 C-6 16.5 6 16.5 6 14 L6 0 C6 -4 2.5 -5.5 2.5 -8.5 L2.5 -14 L-2.5 -14 L-2.5 -8.5 C-2.5 -5.5 -6 -4 -6 0 Z"
          />
        </g>
      </g>
      {/* струя — только в наклоне */}
      <path className="pour thin" pathLength={1} d="M84 30 C82 37 81 43 80 50" />
      {/* винный бокал-тюльпан */}
      <path
        className="d d2"
        pathLength={1}
        d="M63 46 L93 46 C97 60 95 74 84 80 C80 82.5 76 82.5 72 80 C61 74 59 60 63 46 Z"
      />
      <path className="wine-level thin" pathLength={1} d="M64 64 C70 67 86 67 92 64" />
      {/* ножка и стол */}
      <path className="d d3" pathLength={1} d="M78 82 L78 100 M52 104 L118 104" />
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
    <div className="page split">
      <PhotoPane />

      <div className="content">
        <header className="top">
          <span>одна команда — три места</span>
          <span>казань</span>
        </header>

        <main className="rows">
        {venues.map((v, i) => {
          const Doodle = doodles[v.doodle];
          const mask = `url(${basePath}${v.logo})`;
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
                <span
                  role="img"
                  aria-label={v.logoAlt}
                  className={v.logoClass}
                  style={{ maskImage: mask, WebkitMaskImage: mask }}
                />
                <span className="row__meta">{v.meta}</span>
              </span>
              {v.doodleSide === "right" && <Doodle />}
            </a>
          );
        })}
        </main>

        <nav className="bottom">
          <a href="#">бронировать</a>
          <a href="#">афиша</a>
          <a href="#">чаевые</a>
        </nav>
      </div>
    </div>
  );
}
