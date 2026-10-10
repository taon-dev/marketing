//#region imports
import {
  Taon,
  TaonController,
  TaonBaseCrudController,
  Query,
  GET,
  POST,
  PUT,
  DELETE,
  Body,
} from 'taon/src';

import { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
import { TaonMarketingPopupRepository } from './taon-marketing-popup.repository';
import type { TaonMarketingPopupFields } from './taon-marketing-popup.models';
//#endregion

@TaonController<TaonMarketingPopupController>({
  className: 'TaonMarketingPopupController',
  allowedMethods: [
    'getAll', 'getBy', 'paginationQuery', 'getActivePopups',
    'savePopup', 'setEnabled', 'deletePopup',
  ],
})
export class TaonMarketingPopupController extends TaonBaseCrudController<
  TaonMarketingPopupEntity,
  {
    /* file upload query params type */
  },
  TaonMarketingPopupController
> {
  entityClassResolveFn: () => typeof TaonMarketingPopupEntity = () => TaonMarketingPopupEntity;

  private readonly taonMarketingPopupRepository = this.injectCustomRepo(TaonMarketingPopupRepository);

  @GET()
  getActivePopups(): Taon.Response<TaonMarketingPopupEntity[]> {
    //#region @websqlFunc
    return async () => this.taonMarketingPopupRepository.activePopups();
    //#endregion
  }

  @POST()
  savePopup(
    @Body() input: TaonMarketingPopupFields,
    @Query('id') id?: number,
  ): Taon.Response<TaonMarketingPopupEntity> {
    //#region @websqlFunc
    return async () => this.taonMarketingPopupRepository.savePopup(input, id);
    //#endregion
  }

  @PUT()
  setEnabled(
    @Query('id') id: number,
    @Body('enabled') enabled: boolean,
  ): Taon.Response<TaonMarketingPopupEntity> {
    //#region @websqlFunc
    return async () => this.taonMarketingPopupRepository.setEnabled(id, enabled);
    //#endregion
  }

  @DELETE()
  deletePopup(@Query('id') id: number): Taon.Response<void> {
    //#region @websqlFunc
    return async () => this.taonMarketingPopupRepository.deletePopup(id);
    //#endregion
  }
}