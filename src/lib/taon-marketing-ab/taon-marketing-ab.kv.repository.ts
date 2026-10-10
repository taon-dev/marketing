//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonMarketingAbEntity } from './taon-marketing-ab.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingAbKvRepository',
})
export class TaonMarketingAbKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonMarketingAbEntity[];
}> {
  async notifyUsers(users: TaonMarketingAbEntity[]) {
    this.set('usersToNotify', users);
  }
}