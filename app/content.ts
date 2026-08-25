export type Product = {
  number: string;
  title: string;
  description: string;
};

export type SiteContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  companyEyebrow: string;
  companyTitle: string;
  companyText: string;
  products: Product[];
  contactEmail: string;
  contactLocation: string;
};

export const defaultContent: SiteContent = {
  heroEyebrow: "Supporting every stage of farming",
  heroTitle: "From soil preparation to market-ready produce.",
  heroText: "Agriwerk LLP works across the farming cycle, helping people plan better, grow stronger, harvest carefully, and use the right tools along the way.",
  companyEyebrow: "What we do",
  companyTitle: "One partner for the whole farming journey.",
  companyText: "From before plantation to post harvest, we bring together agricultural knowledge, field support, equipment manufacturing, and value-chain thinking.",
  products: [
    { number: "01", title: "Before plantation", description: "Planning, soil preparation, seed selection, nursery support, irrigation design, and farm inputs that set every crop up for a stronger start." },
    { number: "02", title: "Plantation to harvest", description: "Field guidance, crop monitoring, nutrient management, crop protection, irrigation support, and timely farm operations through the growing cycle." },
    { number: "03", title: "Post harvest", description: "Harvest planning, sorting, grading, packing, storage, processing, transport, and market access that protect value after the crop leaves the field." },
  ],
  contactEmail: "hello@agriwerk.com",
  contactLocation: "Working with partners across India",
};

export const contentStorageKey = "agriwerk-site-content";
