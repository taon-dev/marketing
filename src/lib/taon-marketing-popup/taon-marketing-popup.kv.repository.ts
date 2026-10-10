//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingPopupKvRepository',
})
export class TaonMarketingPopupKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonMarketingPopupEntity[];
}> {
  async notifyUsers(users: TaonMarketingPopupEntity[]) {
    this.set('usersToNotify', users);
  }
}