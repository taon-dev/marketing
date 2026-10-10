//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonMarketingEventEntity } from './taon-marketing-event.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingEventKvRepository',
})
export class TaonMarketingEventKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonMarketingEventEntity[];
}> {
  async notifyUsers(users: TaonMarketingEventEntity[]) {
    this.set('usersToNotify', users);
  }
}