//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonMarketingAbEntity } from './taon-marketing-ab.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingAbRepository',
})
export class TaonMarketingAbRepository extends TaonBaseRepository<TaonMarketingAbEntity> {
  entityClassResolveFn: () => typeof TaonMarketingAbEntity = () => TaonMarketingAbEntity;

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