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
  updated: string;
  howToPlay: {
    id: string;
    steps: Array<{
      body: string;
      demo:
        | {
            letters: string[];
            type: 'word';
          }
        | {
            tiles: Array<{
              letter: string;
              state: 'absent' | 'correct' | 'present';
            }>;
            type: 'tiles';
          }
        | {
            after: number;
            before: number;
            label: string;
            type: 'remaining';
          }
        | {
            items: string[];
            type: 'flow';
          };
      title: string;
    }>;
    title: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  sections: Array<{
    faqs?: Array<{
      answer: string;
      question: string;
    }>;
    id: string;
    paragraphs: string[];
    title: string;
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
