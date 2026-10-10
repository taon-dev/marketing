//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonMarketingNewsletterEntity } from './taon-marketing-newsletter.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingNewsletterKvRepository',
})
export class TaonMarketingNewsletterKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonMarketingNewsletterEntity[];
}> {
  async notifyUsers(users: TaonMarketingNewsletterEntity[]) {
    this.set('usersToNotify', users);
  }
}