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

import { TaonMarketingNewsletterEntity } from './taon-marketing-newsletter.entity';
import { TaonMarketingNewsletterRepository } from './taon-marketing-newsletter.repository';
//#endregion

@TaonController<TaonMarketingNewsletterController>({
  className: 'TaonMarketingNewsletterController',
  // allowedMethods: []
})
export class TaonMarketingNewsletterController extends TaonBaseCrudController<
  TaonMarketingNewsletterEntity,
  {
    /* file upload query params type */
  },
  TaonMarketingNewsletterController
> {
  entityClassResolveFn: () => typeof TaonMarketingNewsletterEntity = () => TaonMarketingNewsletterEntity;

  private readonly taonMarketingNewsletterRepository = this.injectCustomRepo(TaonMarketingNewsletterRepository);

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
        await this.taonMarketingNewsletterRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaonMarketingNewsletterController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}