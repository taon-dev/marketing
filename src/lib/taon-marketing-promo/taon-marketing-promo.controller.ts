//#region imports
import {
  Taon,
  ClassHelpers,
  TaonController,
  TaonBaseCrudController,
  Query,
  GET,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonMarketingPromoEntity } from './taon-marketing-promo.entity';
import { TaonMarketingPromoRepository } from './taon-marketing-promo.repository';
//#endregion

@TaonController<TaonMarketingPromoController>({
  className: 'TaonMarketingPromoController',
  // allowedMethods: []
})
export class TaonMarketingPromoController extends TaonBaseCrudController<
  TaonMarketingPromoEntity,
  {
    /* file upload query params type */
  },
  TaonMarketingPromoController
> {
  entityClassResolveFn: () => typeof TaonMarketingPromoEntity = () => TaonMarketingPromoEntity;

  private readonly taonMarketingPromoRepository = this.injectCustomRepo(TaonMarketingPromoRepository);

  //#region methods & getters / hello world
  /**
   * TODO remove this demo example method
   */
  @GET()
  helloWord(@Query('yourName') yourName: string): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      const numOfEntities = await this.db.count();
      const numberOfEvenEntities =
        await this.taonMarketingPromoRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaonMarketingPromoController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}