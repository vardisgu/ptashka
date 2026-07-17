import { Icon3D } from "@/components/icons3d";

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

export function Hub() {
  return (
    <main className="hub">
      {venues.map((v) => (
        <a
          key={v.slug}
          href={v.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${v.name} — перейти`}
          className="hub__row"
        >
          {v.iconSide === "left" && <Icon3D kind={v.icon} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${basePath}${v.logo}`} alt={v.logoAlt} className={v.logoClass} />
          {v.iconSide === "right" && <Icon3D kind={v.icon} />}
        </a>
      ))}
    </main>
  );
}
