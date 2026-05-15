import React from 'react';

import type { StaticPageContent } from '../types';

type StaticPageProps = {
  page: StaticPageContent;
};

function StaticPage({ page }: StaticPageProps) {
  return (
    <main className="static-page">
      <section className="static-page-hero">
        <p className="guide-eyebrow">Kilordle</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        {page.updated && <p className="static-page-updated">Last updated: {page.updated}</p>}
      </section>
      <div className="static-page-sections">
        {page.sections.map((section) => (
          <section className="static-page-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}

export default StaticPage;
