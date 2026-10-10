//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
import { TaonMarketingPopupController } from './taon-marketing-popup.controller';
import { TaonMarketingPopupRepository } from './taon-marketing-popup.repository';
// import { TaonMarketingPopupKvRepository } from './taon-marketing-popup.kv.repository';
import { TaonMarketingPopupProvider } from './taon-marketing-popup.provider';
// import { TaonMarketingPopupMiddleware } from './taon-marketing-popup.middleware';
// import { TaonMarketingPopupSubscriber } from './taon-marketing-popup.subscriber';
//#endregion

export const TaonMarketingPopupAbstractContext = createContext(() => ({
  contextName: 'TaonMarketingPopupAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonMarketingPopupEntity },
  controllers: { TaonMarketingPopupController },
  repositories: {
    // TaonMarketingPopupKvRepository
    TaonMarketingPopupRepository,
  },
  providers: { TaonMarketingPopupProvider },
  // middlewares: { TaonMarketingPopupMiddleware },
  // subscribers: { TaonMarketingPopupSubscriber },
}));