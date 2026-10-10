//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingPopupRepository',
})
export class TaonMarketingPopupRepository extends TaonBaseRepository<TaonMarketingPopupEntity> {
  entityClassResolveFn: () => typeof TaonMarketingPopupEntity = () => TaonMarketingPopupEntity;

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