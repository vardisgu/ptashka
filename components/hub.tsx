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
};

const venues: Venue[] = [
  {
    slug: "ptashka",
    name: "Ранняя пташка",
    href: "https://www.instagram.com/ptashka_coffee/",
    logo: "/logo/ptashka.png",
    logoAlt: "ранняя пташка",
    logoClass: "row__logo",
    meta: "кофейня — завтраки весь день — астрономическая, 17",
  },
  {
    slug: "yasniy",
    name: "Ясный",
    href: "https://www.instagram.com/yasniybar/",
    logo: "/logo/yisniy.png",
    logoAlt: "Ясный",
    logoClass: "row__logo row__logo--tall",
    meta: "батч-бар — безлимитный фильтр — островского, 9",
  },
  {
    slug: "melok",
    name: "Мелок",
    href: "https://www.instagram.com/melok.bar/",
    logo: "/logo/melok.png",
    logoAlt: "Мелок",
    logoClass: "row__logo row__logo--compact",
    meta: "винный бар — кухня и события — кави наджми, 8а",
  },
];

const tickerLine =
  "завтраки ✳ спешалти-кофе ✳ безлимитный фильтр ✳ своя пекарня ✳ " +
  "натуральное вино ✳ мероприятия ✳ казань ✳ ";

export function Hub() {
  return (
    <div className="page">
      <header className="top">
        <span>одна команда — три места</span>
        <span>казань</span>
      </header>

      <main className="rows">
        {venues.map((v) => (
          <a
            key={v.slug}
            href={v.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${v.name} — ${v.meta}`}
            className="row"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${basePath}${v.logo}`} alt={v.logoAlt} className={v.logoClass} />
            <span className="row__meta">{v.meta}</span>
          </a>
        ))}
      </main>

      <footer className="ticker" aria-hidden>
        <div className="ticker__track">
          <span className="ticker__half">{tickerLine.repeat(3)}</span>
          <span className="ticker__half">{tickerLine.repeat(3)}</span>
        </div>
      </footer>
    </div>
  );
}
