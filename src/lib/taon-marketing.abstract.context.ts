// THIS FILE IS GENERATED - DO NOT MODIFY
import { TaonSessionAbstractContext } from '@taon-dev/session/src';
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonMarketingEventAbstractContext } from './taon-marketing-event/taon-marketing-event.abstract.context';

export const TaonMarketingAbstractContext = createContext(() => ({
  contextName: 'TaonMarketingAbstractContext',
  abstract: true,
  contexts: {
    TaonSessionAbstractContext,
    TaonMarketingEventAbstractContext,
  },
}));

// THIS FILE IS GENERATED - DO NOT MODIFY