/**
 * Warm (gold) assets: `/public/images/`.
 * Purple theme: `/public/images/purple/` — filenames match what is in that folder.
 * If a purple file is missing, `imagePurple` can match `imageWarm` until you add one.
 */
export const heroImages = {
  warm: "/images/landertopImage.webp",
  purple: "/images/purple/landertopImagePurple.webp",
} as const;

export type ShowcaseCategory = {
  title: string;
  alt: string;
  imageWarm: string;
  imagePurple: string;
};

export const showcaseCategories: ShowcaseCategory[] = [
  {
    title: "Latest Disposable Vapes",
    imageWarm: "/images/vapesCat.webp",
    // No purple asset in repo yet — uses warm image in purple theme too
    imagePurple: "/images/vapesCat.webp",
    alt: "Disposable vapes at Cottonwoods Smoke Shop",
  },
  {
    title: "Vape Mods & Kits",
    imageWarm: "/images/modvape.webp",
    imagePurple: "/images/purple/modvabePurple.png",
    alt: "Vape mods and kits at Cottonwoods Smoke Shop",
  },
  {
    title: "Vape Tanks, Coils & Pods",
    imageWarm: "/images/VapeTanksCoilsPods.webp",
    imagePurple: "/images/purple/VapeTanksCoilsPodsPurple.png",
    alt: "Vape tanks, coils, and pods at Cottonwoods Smoke Shop",
  },
  {
    title: "E-Juices & Salt-Nics",
    imageWarm: "/images/EJuicesSaltNics.webp",
    imagePurple: "/images/purple/EJuicesSaltNicsPurple.png",
    alt: "E-juices and salt nicotine at Cottonwoods Smoke Shop",
  },
  {
    title: "Incenses & Sages",
    imageWarm: "/images/IncensesSages.webp",
    imagePurple: "/images/purple/IncensesSagespurple.png",
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
  {
    label: "GeekVape",
    imageWarm: "/images/logos/geekvapelogo.png",
    imagePurple: "/images/purple/logos/geekvapepurple.png",
  },
  {
    label: "SMOK",
    imageWarm: "/images/logos/smoke.png",
    imagePurple: "/images/purple/logos/smokepurple.png",
  },
  {
    label: "Yucan",
    imageWarm: "/images/logos/yucan.png",
    imagePurple: "/images/purple/logos/yucanpurple.png",
  },
  {
    label: "Hemper",
    imageWarm: "/images/logos/hemper.png",
    imagePurple: "/images/purple/logos/hemperpurple.png",
  },
  {
    label: "GRAV",
    imageWarm: "/images/logos/grav.png",
    imagePurple: "/images/purple/logos/gravpurple.png",
  },
  {
    label: "Lookah",
    imageWarm: "/images/logos/lookah.png",
    imagePurple: "/images/purple/logos/lookahpurple.png",
  },
];
