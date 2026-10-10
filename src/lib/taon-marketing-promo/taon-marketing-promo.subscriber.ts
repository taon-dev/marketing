//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonMarketingPromoEntity } from './taon-marketing-promo.entity';
import { TaonMarketingPromoProvider } from './taon-marketing-promo.provider';
//#endregion

@TaonSubscriber<TaonMarketingPromoSubscriber>({
  className: 'TaonMarketingPromoSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonMarketingPromoSubscriber extends TaonBaseSubscriberForEntity {
  private readonly taonMarketingPromoProvider = this.injectProvider(TaonMarketingPromoProvider);
  listenTo(): typeof TaonMarketingPromoEntity {
    return TaonMarketingPromoEntity;
  }
}