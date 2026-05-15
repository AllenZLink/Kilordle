import React from 'react';

import type { HomeContent } from '../types';

type HomeGuideProps = {
  home: HomeContent;
};

function HomeGuide({ home }: HomeGuideProps) {
  return (
    <main id="game-guide">
      <section className="guide-intro" aria-labelledby="game-guide-title">
        <p className="guide-eyebrow">{home.intro.eyebrow}</p>
        <h1 id="game-guide-title">{home.intro.title}</h1>
        {home.intro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <div className="guide-sections">
        {home.sections.map((section) => (
          <section className="guide-section" id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}

export default HomeGuide;
