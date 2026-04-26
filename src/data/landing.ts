/**
 * Warm (gold) assets: `/public/images/`.
 * Purple theme: `/public/images/purple/` (often same base names; hero/detox may use custom names).
 */
export const heroImages = {
  warm: "/images/landertopImage.webp",
  purple: "/images/purple/landertopImagePurple.webp",
} as const;

export type ShowcaseCategory = {
  title: string;
  alt: string;
  /** Default / gold theme image */
  imageWarm: string;
  /** Purple theme image (same filename under `/images/purple/`) */
  imagePurple: string;
};

export const showcaseCategories: ShowcaseCategory[] = [
  {
    title: "Latest Disposable Vapes",
    imageWarm: "/images/vapesCat.webp",
    imagePurple: "/images/purple/vapesCat.webp",
    alt: "Disposable vapes at Cottonwoods Smoke Shop",
  },
  {
    title: "Vape Mods & Kits",
    imageWarm: "/images/modvape.webp",
    imagePurple: "/images/purple/modvape.webp",
    alt: "Vape mods and kits at Cottonwoods Smoke Shop",
  },
  {
    title: "Vape Tanks, Coils & Pods",
    imageWarm: "/images/VapeTanksCoilsPods.webp",
    imagePurple: "/images/purple/VapeTanksCoilsPods.webp",
    alt: "Vape tanks, coils, and pods at Cottonwoods Smoke Shop",
  },
  {
    title: "E-Juices & Salt-Nics",
    imageWarm: "/images/EJuicesSaltNics.webp",
    imagePurple: "/images/purple/EJuicesSaltNics.webp",
    alt: "E-juices and salt nicotine at Cottonwoods Smoke Shop",
  },
  {
    title: "Incenses & Sages",
    imageWarm: "/images/IncensesSages.webp",
    imagePurple: "/images/purple/IncensesSages.webp",
    alt: "Incense and sage at Cottonwoods Smoke Shop",
  },
  {
    title: "Detox Drinks",
    imageWarm: "/images/detoxdrinks.webp",
    imagePurple: "/images/purple/detoxDrinksPurpl.webp",
    alt: "Detox drinks at Cottonwoods Smoke Shop",
  },
];

export const otherProductCategories = [
  "Smokes",
  "E-Cigarettes",
  "Novelty & Accessories",
  "Hookah",
  "Pipes & Glassware",
  "Disposable Vapes",
] as const;

export type BrandSlide = {
  label: string;
  imageWarm: string;
  imagePurple: string;
};

export const brandSlides: readonly BrandSlide[] = [
  { label: "GeekVape", imageWarm: "https://placehold.co/360x160/1a1511/e3a04d?text=GeekVape", imagePurple: "https://placehold.co/360x160/120a18/c4b5fd?text=GeekVape" },
  { label: "SMOK", imageWarm: "https://placehold.co/360x160/1a1511/e3a04d?text=SMOK", imagePurple: "https://placehold.co/360x160/120a18/c4b5fd?text=SMOK" },
  { label: "Vapetasia", imageWarm: "https://placehold.co/360x160/1a1511/e3a04d?text=Vapetasia", imagePurple: "https://placehold.co/360x160/120a18/c4b5fd?text=Vapetasia" },
  { label: "Hyde", imageWarm: "https://placehold.co/360x160/1a1511/e3a04d?text=Hyde", imagePurple: "https://placehold.co/360x160/120a18/c4b5fd?text=Hyde" },
  { label: "Elf Bar", imageWarm: "https://placehold.co/360x160/1a1511/e3a04d?text=Elf+Bar", imagePurple: "https://placehold.co/360x160/120a18/c4b5fd?text=Elf+Bar" },
  { label: "Lookah", imageWarm: "https://placehold.co/360x160/1a1511/e3a04d?text=Lookah", imagePurple: "https://placehold.co/360x160/120a18/c4b5fd?text=Lookah" },
  { label: "Candy King", imageWarm: "https://placehold.co/360x160/1a1511/e3a04d?text=Candy+King", imagePurple: "https://placehold.co/360x160/120a18/c4b5fd?text=Candy+King" },
  { label: "Your brand", imageWarm: "https://placehold.co/360x160/1a1511/e3a04d?text=Your+Logo", imagePurple: "https://placehold.co/360x160/120a18/c4b5fd?text=Your+Logo" },
];
