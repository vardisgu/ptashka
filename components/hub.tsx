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
  photo: string;
  photoAlt: string;
  photoSide: "left" | "right";
  tilt: string;
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
    photo: "/photo/ptashka.jpg",
    photoAlt: "Два бейгла с начинками в руках",
    photoSide: "right",
    tilt: "-4deg",
  },
  {
    slug: "yasniy",
    name: "Ясный",
    href: "https://www.instagram.com/yasniybar/",
    logo: "/logo/yisniy.svg",
    logoAlt: "Ясный",
    logoClass: "row__logo row__logo--tall",
    meta: "батч-бар — безлимитный фильтр — островского, 9",
    photo: "/photo/yasniy.jpg",
    photoAlt: "Гостья с фильтр-кофе и бейглом у окна",
    photoSide: "left",
    tilt: "3deg",
  },
  {
    slug: "melok",
    name: "Мелок",
    href: "https://www.instagram.com/melok.bar/",
    logo: "/logo/melok.svg",
    logoAlt: "Мелок",
    logoClass: "row__logo row__logo--compact",
    meta: "винный бар — кухня и события — кави наджми, 8а",
    photo: "/photo/melok.jpg",
    photoAlt: "Гостья в красном в кресле у окна",
    photoSide: "right",
    tilt: "-3deg",
  },
];

export function Hub() {
  return (
    <div className="page">
      <header className="top">
        <span>одна команда — три места</span>
        <span>казань</span>
      </header>

      <main className="rows">
        {venues.map((v, i) => (
          <a
            key={v.slug}
            href={v.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${v.name} — ${v.meta}`}
            className={`row row--${i + 1}`}
            style={{ "--tilt": v.tilt } as React.CSSProperties}
          >
            {v.photoSide === "left" && (
              <span className="row__photo">
                <span className="row__frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${basePath}${v.photo}`} alt={v.photoAlt} />
                </span>
              </span>
            )}
            <span className="row__stack">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${basePath}${v.logo}`} alt={v.logoAlt} className={v.logoClass} />
              <span className="row__meta">{v.meta}</span>
            </span>
            {v.photoSide === "right" && (
              <span className="row__photo">
                <span className="row__frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${basePath}${v.photo}`} alt={v.photoAlt} />
                </span>
              </span>
            )}
          </a>
        ))}
      </main>
    </div>
  );
}
