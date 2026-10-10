//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonMarketingEventEntity } from './taon-marketing-event.entity';
import { TaonMarketingEventController } from './taon-marketing-event.controller';
import { TaonMarketingEventRepository } from './taon-marketing-event.repository';
// import { TaonMarketingEventKvRepository } from './taon-marketing-event.kv.repository';
import { TaonMarketingEventProvider } from './taon-marketing-event.provider';
// import { TaonMarketingEventMiddleware } from './taon-marketing-event.middleware';
// import { TaonMarketingEventSubscriber } from './taon-marketing-event.subscriber';
//#endregion

export const TaonMarketingEventAbstractContext = createContext(() => ({
  contextName: 'TaonMarketingEventAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonMarketingEventEntity },
  controllers: { TaonMarketingEventController },
  repositories: {
    // TaonMarketingEventKvRepository
    TaonMarketingEventRepository,
  },
  providers: { TaonMarketingEventProvider },
  // middlewares: { TaonMarketingEventMiddleware },
  // subscribers: { TaonMarketingEventSubscriber },
}));