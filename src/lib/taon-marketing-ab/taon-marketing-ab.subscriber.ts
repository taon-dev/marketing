//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonMarketingAbEntity } from './taon-marketing-ab.entity';
import { TaonMarketingAbProvider } from './taon-marketing-ab.provider';
//#endregion

@TaonSubscriber<TaonMarketingAbSubscriber>({
  className: 'TaonMarketingAbSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonMarketingAbSubscriber extends TaonBaseSubscriberForEntity {
  private readonly taonMarketingAbProvider = this.injectProvider(TaonMarketingAbProvider);
  listenTo(): typeof TaonMarketingAbEntity {
    return TaonMarketingAbEntity;
  }
}