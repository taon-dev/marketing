//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonMarketingPromoEntity } from './taon-marketing-promo.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingPromoKvRepository',
})
export class TaonMarketingPromoKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonMarketingPromoEntity[];
}> {
  async notifyUsers(users: TaonMarketingPromoEntity[]) {
    this.set('usersToNotify', users);
  }
}