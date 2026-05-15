import React from 'react';

import type { SiteContent } from '../types';

type SiteFooterProps = {
  site: SiteContent;
};

function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer id="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-main">
          <section className="site-footer-brand" aria-label="About Kilordle">
            <div className="site-footer-logo-row">
              <span className="site-footer-mark" aria-hidden="true" />
              <span className="site-footer-name">{site.brand}</span>
            </div>
            <p>{site.footer.description}</p>
          </section>
          <div className="site-footer-columns">
            {site.footer.columns.map((column) => (
              <nav
                className="site-footer-column"
                aria-label={column.title}
                key={column.title}
              >
                <h2>{column.title}</h2>
                {column.links.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="site-footer-bottom">
          {site.footer.legal.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
