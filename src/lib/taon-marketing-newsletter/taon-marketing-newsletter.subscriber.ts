//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonMarketingNewsletterEntity } from './taon-marketing-newsletter.entity';
import { TaonMarketingNewsletterProvider } from './taon-marketing-newsletter.provider';
//#endregion

@TaonSubscriber<TaonMarketingNewsletterSubscriber>({
  className: 'TaonMarketingNewsletterSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonMarketingNewsletterSubscriber extends TaonBaseSubscriberForEntity {
  private readonly taonMarketingNewsletterProvider = this.injectProvider(TaonMarketingNewsletterProvider);
  listenTo(): typeof TaonMarketingNewsletterEntity {
    return TaonMarketingNewsletterEntity;
  }
}