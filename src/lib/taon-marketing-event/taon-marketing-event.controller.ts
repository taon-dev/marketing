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

import { TaonMarketingEventEntity } from './taon-marketing-event.entity';
import { TaonMarketingEventRepository } from './taon-marketing-event.repository';
//#endregion

@TaonController<TaonMarketingEventController>({
  className: 'TaonMarketingEventController',
})
export class TaonMarketingEventController extends TaonBaseCrudController<TaonMarketingEventEntity> {
  entityClassResolveFn: () => typeof TaonMarketingEventEntity = () => TaonMarketingEventEntity;

  taonMarketingEventRepository = this.injectCustomRepo(TaonMarketingEventRepository);

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
        await this.taonMarketingEventRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaonMarketingEventController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}