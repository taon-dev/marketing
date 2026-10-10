//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonMarketingEventEntity } from './taon-marketing-event.entity';
import { TaonMarketingEventProvider } from './taon-marketing-event.provider';
//#endregion

@TaonSubscriber<TaonMarketingEventSubscriber>({
  className: 'TaonMarketingEventSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonMarketingEventSubscriber extends TaonBaseSubscriberForEntity {
  taonMarketingEventProvider = this.injectProvider(TaonMarketingEventProvider);
  listenTo(): typeof TaonMarketingEventEntity {
    return TaonMarketingEventEntity;
  }
}