//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
import { TaonMarketingPopupProvider } from './taon-marketing-popup.provider';
//#endregion

@TaonSubscriber<TaonMarketingPopupSubscriber>({
  className: 'TaonMarketingPopupSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonMarketingPopupSubscriber extends TaonBaseSubscriberForEntity {
  private readonly taonMarketingPopupProvider = this.injectProvider(TaonMarketingPopupProvider);
  listenTo(): typeof TaonMarketingPopupEntity {
    return TaonMarketingPopupEntity;
  }
}