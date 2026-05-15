import fs from 'fs';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';

import renderHomeFragments from './pages/home';
import renderStaticPage from './pages/staticPage';
import type { HomeContent, SiteContent, StaticPageContent } from './types';

const markerNames = ['HEADER', 'CONTENT', 'FOOTER', 'JSONLD'] as const;
const staticPageFiles = [
  'about',
  'contact',
  'terms',
  'privacy',
  'changelog',
] as const;

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

function ensureMarkers(html: string) {
  markerNames.forEach((name) => {
    if (!html.includes(`STATIC_SITE_${name}_START`)) {
      throw new Error(`Missing STATIC_SITE_${name}_START marker`);
    }
    if (!html.includes(`STATIC_SITE_${name}_END`)) {
      throw new Error(`Missing STATIC_SITE_${name}_END marker`);
    }
  });
}

function replaceMarker(html: string, name: (typeof markerNames)[number], markup: string) {
  const pattern = new RegExp(
    `(<!-- STATIC_SITE_${name}_START -->)[\\s\\S]*?(<!-- STATIC_SITE_${name}_END -->)`
  );

  if (!pattern.test(html)) {
    throw new Error(`Missing STATIC_SITE_${name} markers in public/index.html`);
  }

  return html.replace(pattern, `$1\n${markup}\n    $2`);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.replace(/\/+$/, '');
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getRoutePath(slug?: string) {
  return slug ? `/${slug}/` : '/';
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
}

function getHomeFaqs(home: HomeContent) {
  return (
    home.sections.find((section) => section.id === 'faq')?.faqs ?? []
  );
}

function renderHomeJsonLd({
  home,
  site,
}: {
  home: HomeContent;
  site: SiteContent;
}) {
  const baseUrl = normalizeSiteUrl(site.siteUrl);
  const homeUrl = `${baseUrl}/`;
  const faqItems = getHomeFaqs(home);
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${homeUrl}#webpage`,
      url: homeUrl,
      name: 'Kilordle',
      description: home.intro.paragraphs[0],
      dateModified: home.updated,
      breadcrumb: {
        '@id': `${homeUrl}#breadcrumb`,
      },
      mainEntity: {
        '@id': `${homeUrl}#faq`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${homeUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: homeUrl,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${homeUrl}#faq`,
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return `<script type="application/ld+json">
${safeJsonLd({
  '@context': 'https://schema.org',
  '@graph': graph,
})}
</script>`;
}

function generateHomePage(rootDir: string) {
  const indexPath = path.join(rootDir, 'public', 'index.html');
  const contentDir = path.join(rootDir, 'static-site', 'content');
  const site = readJson<SiteContent>(path.join(contentDir, 'site.json'));
  const home = readJson<HomeContent>(path.join(contentDir, 'home.json'));
  const fragments = renderHomeFragments({ home, site });

  let html = fs.readFileSync(indexPath, 'utf8');
  ensureMarkers(html);
  html = replaceMarker(
    html,
    'HEADER',
    renderToStaticMarkup(fragments.header)
  );
  html = replaceMarker(
    html,
    'CONTENT',
    renderToStaticMarkup(fragments.content)
  );
  html = replaceMarker(
    html,
    'FOOTER',
    renderToStaticMarkup(fragments.footer)
  );
  html = replaceMarker(html, 'JSONLD', renderHomeJsonLd({ home, site }));
  fs.writeFileSync(indexPath, html, 'utf8');
}

function renderDocument({
  body,
  description,
  title,
}: {
  body: string;
  description: string;
  title: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="../favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="stylesheet" href="../static-site.css" />
    <title>${escapeHtml(title)} | Kilordle</title>
  </head>
  <body class="static-document">
    ${body}
  </body>
</html>
`;
}

function generateStaticPages(rootDir: string) {
  const contentDir = path.join(rootDir, 'static-site', 'content');
  const pagesDir = path.join(contentDir, 'pages');
  const publicDir = path.join(rootDir, 'public');
  const site = readJson<SiteContent>(path.join(contentDir, 'site.json'));

  staticPageFiles.forEach((pageName) => {
    const page = readJson<StaticPageContent>(
      path.join(pagesDir, `${pageName}.json`)
    );
    const outputDir = path.join(publicDir, page.slug);
    const html = renderDocument({
      body: renderToStaticMarkup(renderStaticPage({ page, site })),
      description: page.description,
      title: page.title,
    });

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
  });
}

function generateSitemap(rootDir: string) {
  const contentDir = path.join(rootDir, 'static-site', 'content');
  const pagesDir = path.join(contentDir, 'pages');
  const publicDir = path.join(rootDir, 'public');
  const site = readJson<SiteContent>(path.join(contentDir, 'site.json'));
  const baseUrl = normalizeSiteUrl(site.siteUrl);
  const urls = [
    {
      loc: `${baseUrl}/`,
      priority: '1.0',
    },
    ...staticPageFiles.map((pageName) => {
      const page = readJson<StaticPageContent>(
        path.join(pagesDir, `${pageName}.json`)
      );

      return {
        loc: `${baseUrl}${getRoutePath(page.slug)}`,
        priority: page.slug === 'about' || page.slug === 'contact' ? '0.7' : '0.5',
      };
    }),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
}

export function generateStaticSite(rootDir = path.resolve(__dirname, '..')) {
  generateHomePage(rootDir);
  generateStaticPages(rootDir);
  generateSitemap(rootDir);
  console.log('Generated static React HTML and sitemap');
}

generateStaticSite();
