import React from 'react';

import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import StaticPage from '../components/StaticPage';
import type { SiteContent, StaticPageContent } from '../types';

type RenderStaticPageArgs = {
  page: StaticPageContent;
  site: SiteContent;
};

function renderStaticPage({ page, site }: RenderStaticPageArgs) {
  return (
    <>
      <SiteHeader site={site} />
      <StaticPage page={page} />
      <SiteFooter site={site} />
    </>
  );
}

export default renderStaticPage;
