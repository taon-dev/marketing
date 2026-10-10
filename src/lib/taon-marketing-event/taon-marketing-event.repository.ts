//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonMarketingEventEntity } from './taon-marketing-event.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingEventRepository',
})
export class TaonMarketingEventRepository extends TaonBaseRepository<TaonMarketingEventEntity> {
  entityClassResolveFn: () => typeof TaonMarketingEventEntity = () => TaonMarketingEventEntity;

  /**
   * TODO remove this demo example method
   */
  async countEntitesWithEvenId(): Promise<number> {
    //#region @websqlFunc
    const result = await this.count({
      where: {
        id: Raw(alias => `${alias} % 2 = 0`),
      },
    });
    return result;
    //#endregion
  }
}