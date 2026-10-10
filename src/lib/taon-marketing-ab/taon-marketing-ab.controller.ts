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

import { TaonMarketingAbEntity } from './taon-marketing-ab.entity';
import { TaonMarketingAbRepository } from './taon-marketing-ab.repository';
//#endregion

@TaonController<TaonMarketingAbController>({
  className: 'TaonMarketingAbController',
  // allowedMethods: []
})
export class TaonMarketingAbController extends TaonBaseCrudController<
  TaonMarketingAbEntity,
  {
    /* file upload query params type */
  },
  TaonMarketingAbController
> {
  entityClassResolveFn: () => typeof TaonMarketingAbEntity = () => TaonMarketingAbEntity;

  private readonly taonMarketingAbRepository = this.injectCustomRepo(TaonMarketingAbRepository);

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
        await this.taonMarketingAbRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaonMarketingAbController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}