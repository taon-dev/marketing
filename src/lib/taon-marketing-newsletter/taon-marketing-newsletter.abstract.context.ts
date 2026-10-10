//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonMarketingNewsletterEntity } from './taon-marketing-newsletter.entity';
import { TaonMarketingNewsletterController } from './taon-marketing-newsletter.controller';
import { TaonMarketingNewsletterRepository } from './taon-marketing-newsletter.repository';
// import { TaonMarketingNewsletterKvRepository } from './taon-marketing-newsletter.kv.repository';
import { TaonMarketingNewsletterProvider } from './taon-marketing-newsletter.provider';
// import { TaonMarketingNewsletterMiddleware } from './taon-marketing-newsletter.middleware';
// import { TaonMarketingNewsletterSubscriber } from './taon-marketing-newsletter.subscriber';
//#endregion

export const TaonMarketingNewsletterAbstractContext = createContext(() => ({
  contextName: 'TaonMarketingNewsletterAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonMarketingNewsletterEntity },
  controllers: { TaonMarketingNewsletterController },
  repositories: {
    // TaonMarketingNewsletterKvRepository
    TaonMarketingNewsletterRepository,
  },
  providers: { TaonMarketingNewsletterProvider },
  // middlewares: { TaonMarketingNewsletterMiddleware },
  // subscribers: { TaonMarketingNewsletterSubscriber },
}));