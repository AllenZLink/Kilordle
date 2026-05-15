import React from 'react';

import type { SiteContent } from '../types';

type SiteHeaderProps = {
  site: SiteContent;
};

function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header id="site-header">
      <div className="site-brand">
        <div className="site-brand-name">{site.brand}</div>
        <div className="site-brand-tagline">{site.tagline}</div>
      </div>
      {site.nav.length > 0 && (
        <>
          <nav className="site-nav" aria-label="Primary navigation">
            {site.nav.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <details className="site-mobile-menu">
            <summary aria-label="Open navigation menu">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile navigation">
              {site.nav.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </details>
        </>
      )}
    </header>
  );
}

export default SiteHeader;
