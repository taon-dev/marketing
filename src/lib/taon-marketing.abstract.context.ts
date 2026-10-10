import { TaonCmsAbstractContext } from '@taon-dev/cms/src';
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonMarketingAbAbstractContext } from './taon-marketing-ab/taon-marketing-ab.abstract.context';
import { TaonMarketingNewsletterAbstractContext } from './taon-marketing-newsletter/taon-marketing-newsletter.abstract.context';
import { TaonMarketingPopupAbstractContext } from './taon-marketing-popup/taon-marketing-popup.abstract.context';
import { TaonMarketingPromoAbstractContext } from './taon-marketing-promo/taon-marketing-promo.abstract.context';

export const TaonMarketingAbstractContext = createContext(() => ({
  contextName: 'TaonMarketingAbstractContext',
  abstract: true,
  contexts: {
    TaonCmsAbstractContext,

    TaonMarketingAbAbstractContext,
    TaonMarketingNewsletterAbstractContext,
    TaonMarketingPopupAbstractContext,
    TaonMarketingPromoAbstractContext,
  },
}));
