/** Store details — single source of truth for the marketing site. */
export const SITE = {
  name: "Cottonwoods Smoke Shop",
  tagline: "Vape, glass & smoke essentials — curated for locals.",
  email: "cottonwoodhs123@gmail.com",
  /** Optional store phone — leave empty to hide “call us” lines. */
  phone: "",
  street: "4435 TX HWY 123",
  city: "San Marcos",
  state: "Texas",
  stateAbbr: "TX",
  zip: "78666",
  /** Short line for the hero (locale). */
  area: "San Marcos, Texas · 78666",
} as const;

export function formatAddressOneLine() {
  return `${SITE.street}, ${SITE.city}, ${SITE.stateAbbr} ${SITE.zip}`;
}
