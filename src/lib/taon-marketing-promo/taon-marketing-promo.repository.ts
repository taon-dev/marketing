//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonMarketingPromoEntity } from './taon-marketing-promo.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingPromoRepository',
})
export class TaonMarketingPromoRepository extends TaonBaseRepository<TaonMarketingPromoEntity> {
  entityClassResolveFn: () => typeof TaonMarketingPromoEntity = () => TaonMarketingPromoEntity;

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