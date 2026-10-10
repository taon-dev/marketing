//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonMarketingPromoEntity } from './taon-marketing-promo.entity';
import { TaonMarketingPromoController } from './taon-marketing-promo.controller';
import { TaonMarketingPromoRepository } from './taon-marketing-promo.repository';
// import { TaonMarketingPromoKvRepository } from './taon-marketing-promo.kv.repository';
import { TaonMarketingPromoProvider } from './taon-marketing-promo.provider';
// import { TaonMarketingPromoMiddleware } from './taon-marketing-promo.middleware';
// import { TaonMarketingPromoSubscriber } from './taon-marketing-promo.subscriber';
//#endregion

export const TaonMarketingPromoAbstractContext = createContext(() => ({
  contextName: 'TaonMarketingPromoAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonMarketingPromoEntity },
  controllers: { TaonMarketingPromoController },
  repositories: {
    // TaonMarketingPromoKvRepository
    TaonMarketingPromoRepository,
  },
  providers: { TaonMarketingPromoProvider },
  // middlewares: { TaonMarketingPromoMiddleware },
  // subscribers: { TaonMarketingPromoSubscriber },
}));