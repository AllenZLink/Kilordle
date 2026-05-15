import React from 'react';

import HowToPlay from './HowToPlay';
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
        <HowToPlay howToPlay={home.howToPlay} />
        {home.sections.map((section) => (
          <section className="guide-section" id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.faqs && (
              <div className="guide-faqs">
                {section.faqs.map((faq) => (
                  <article className="guide-faq" key={faq.question}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}

export default HomeGuide;
