import React from 'react';

import HomeGuide from '../components/HomeGuide';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import type { HomeContent, SiteContent } from '../types';

type RenderHomeFragmentsArgs = {
  home: HomeContent;
  site: SiteContent;
};

function renderHomeFragments({ home, site }: RenderHomeFragmentsArgs) {
  return {
    header: <SiteHeader site={site} />,
    content: <HomeGuide home={home} />,
    footer: <SiteFooter site={site} />,
  };
}

export default renderHomeFragments;
