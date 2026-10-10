//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonMarketingAbEntity } from './taon-marketing-ab.entity';
import { TaonMarketingAbController } from './taon-marketing-ab.controller';
import { TaonMarketingAbRepository } from './taon-marketing-ab.repository';
// import { TaonMarketingAbKvRepository } from './taon-marketing-ab.kv.repository';
import { TaonMarketingAbProvider } from './taon-marketing-ab.provider';
// import { TaonMarketingAbMiddleware } from './taon-marketing-ab.middleware';
// import { TaonMarketingAbSubscriber } from './taon-marketing-ab.subscriber';
//#endregion

export const TaonMarketingAbAbstractContext = createContext(() => ({
  contextName: 'TaonMarketingAbAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonMarketingAbEntity },
  controllers: { TaonMarketingAbController },
  repositories: {
    // TaonMarketingAbKvRepository
    TaonMarketingAbRepository,
  },
  providers: { TaonMarketingAbProvider },
  // middlewares: { TaonMarketingAbMiddleware },
  // subscribers: { TaonMarketingAbSubscriber },
}));