//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonMarketingNewsletterEntity } from './taon-marketing-newsletter.entity';
//#endregion

@TaonRepository({
  className: 'TaonMarketingNewsletterRepository',
})
export class TaonMarketingNewsletterRepository extends TaonBaseRepository<TaonMarketingNewsletterEntity> {
  entityClassResolveFn: () => typeof TaonMarketingNewsletterEntity = () => TaonMarketingNewsletterEntity;

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