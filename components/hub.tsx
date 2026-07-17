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
  icon: "bagel" | "coffee" | "wine";
  iconSide: "left" | "right";
};

const venues: Venue[] = [
  {
    slug: "ptashka",
    name: "Ранняя пташка",
    href: "https://www.instagram.com/ptashka_coffee/",
    logo: "/logo/ptashka.png",
    logoAlt: "ранняя пташка",
    logoClass: "hub__logo",
    icon: "bagel",
    iconSide: "right",
  },
  {
    slug: "yasniy",
    name: "Ясный",
    href: "https://www.instagram.com/yasniybar/",
    logo: "/logo/yisniy.png",
    logoAlt: "Ясный",
    logoClass: "hub__logo hub__logo--tall",
    icon: "coffee",
    iconSide: "left",
  },
  {
    slug: "melok",
    name: "Мелок",
    href: "https://www.instagram.com/melok.bar/",
    logo: "/logo/melok.png",
    logoAlt: "Мелок",
    logoClass: "hub__logo hub__logo--compact",
    icon: "wine",
    iconSide: "right",
  },
];

function BagelIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="hub__icon icon-bagel" aria-hidden>
      <circle cx="24" cy="24" r="16.5" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="2.4" />
      {/* кунжут — внутри кольца */}
      <path
        d="M33.8 20.5l2.8-1M26 12.4l1.2-2.6M15.5 14.8l-1.9-2.2M11.2 25.8l-2.9.6M19.5 34.3l-1.2 2.7M31 32.4l2 2.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="hub__icon icon-coffee" aria-hidden>
      <g className="steam" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M17 17c2-2.5-2-4.5 0-7.5" />
        <path d="M24 17c2-2.5-2-4.5 0-7.5" />
        <path d="M31 17c2-2.5-2-4.5 0-7.5" />
      </g>
      <path
        d="M11 23h26v9.5a7 7 0 0 1-7 7H18a7 7 0 0 1-7-7Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M37 25.5h1.5a5 5 0 0 1 0 10H36" stroke="currentColor" strokeWidth="2.4" />
      <path d="M14 44h20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function WineIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="hub__icon icon-wine" aria-hidden>
      {/* бутылка, наклонённая к бокалу */}
      <g transform="rotate(126 36 16)">
        <path
          d="M33.5 13v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5c2.6 1.4 3.7 3 3.7 5.6V29a2 2 0 0 1-2 2h-8.4a2 2 0 0 1-2-2V18.6c0-2.6 1.1-4.2 3.7-5.6Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </g>
      {/* струя */}
      <path
        className="pour-stream"
        d="M27 16.5 18 30"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* бокал */}
      <path
        d="M7 30h22l-2 9.4a8.9 7 0 0 1-18 0Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M11.5 34h13l-1 4.8a5.9 4.6 0 0 1-11 0Z" fill="currentColor" />
      <path
        d="M18 46.5V52M11.5 53h13"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const icons = {
  bagel: BagelIcon,
  coffee: CoffeeIcon,
  wine: WineIcon,
};

export function Hub() {
  return (
    <main className="hub">
      {venues.map((v) => {
        const Icon = icons[v.icon];
        return (
          <a
            key={v.slug}
            href={v.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${v.name} — перейти`}
            className="hub__row"
          >
            {v.iconSide === "left" && <Icon />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${basePath}${v.logo}`} alt={v.logoAlt} className={v.logoClass} />
            {v.iconSide === "right" && <Icon />}
          </a>
        );
      })}
    </main>
  );
}
