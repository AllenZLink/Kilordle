import React from 'react';

import type { HomeContent } from '../types';

type HowToPlayProps = {
  howToPlay: HomeContent['howToPlay'];
};

function renderDemo(step: HomeContent['howToPlay']['steps'][number]) {
  const { demo } = step;

  if (demo.type === 'word') {
    return (
      <div className="how-demo how-demo-word" aria-label="Example guess">
        {demo.letters.map((letter, index) => (
          <span className="how-tile" key={`${letter}-${index}`}>
            {letter}
          </span>
        ))}
      </div>
    );
  }

  if (demo.type === 'tiles') {
    return (
      <div className="how-demo how-demo-word" aria-label="Example clue result">
        {demo.tiles.map((tile, index) => (
          <span
            className={`how-tile how-tile-${tile.state}`}
            key={`${tile.letter}-${index}`}
          >
            {tile.letter}
          </span>
        ))}
      </div>
    );
  }

  if (demo.type === 'remaining') {
    return (
      <div className="how-demo how-demo-remaining">
        <span>{demo.label}</span>
        <strong>{demo.before}</strong>
        <span aria-hidden="true">→</span>
        <strong>{demo.after}</strong>
      </div>
    );
  }

  return (
    <div className="how-demo how-demo-flow">
      {demo.items.map((item, index) => (
        <React.Fragment key={item}>
          <span>{item}</span>
          {index < demo.items.length - 1 && <b aria-hidden="true">↓</b>}
        </React.Fragment>
      ))}
    </div>
  );
}

function HowToPlay({ howToPlay }: HowToPlayProps) {
  return (
    <section className="guide-section how-to-play" id={howToPlay.id}>
      <h2>{howToPlay.title}</h2>
      <div className="how-steps">
        {howToPlay.steps.map((step, index) => (
          <article className="how-step" key={step.title}>
            <div className="how-step-copy">
              <span className="how-step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
            {renderDemo(step)}
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowToPlay;
