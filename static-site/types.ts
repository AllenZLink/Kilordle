export type NavLink = {
  label: string;
  href: string;
};

export type FooterContent = {
  description: string;
  columns: Array<{
    title: string;
    links: NavLink[];
  }>;
  legal: string[];
};

export type SiteContent = {
  brand: string;
  siteUrl: string;
  tagline: string;
  nav: NavLink[];
  footer: FooterContent;
};

export type HomeContent = {
  intro: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  sections: Array<{
    id: string;
    title: string;
    items: string[];
  }>;
};

export type StaticPageContent = {
  slug: string;
  title: string;
  description: string;
  updated?: string;
  sections: Array<{
    title: string;
    paragraphs?: string[];
    items?: string[];
  }>;
};
