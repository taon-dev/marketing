//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaonBaseAngularService } from 'taon/src';

import type { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
import { TaonMarketingPopupController } from './taon-marketing-popup.controller';
import type { TaonMarketingPopupFields } from './taon-marketing-popup.models';
//#endregion

@Injectable()
export class TaonMarketingPopupApiService extends TaonBaseAngularService {
  public readonly taonMarketingPopupController = this.injectController(TaonMarketingPopupController);

  public get allMyEntities$(): Observable<TaonMarketingPopupEntity[]> {
    return this.taonMarketingPopupController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public getActivePopups(): Observable<TaonMarketingPopupEntity[]> {
    return this.taonMarketingPopupController.getActivePopups().request!().observable.pipe(
      map(res => res.body.json),
    );
  }

  public savePopup(input: TaonMarketingPopupFields, id?: number): Observable<TaonMarketingPopupEntity> {
    return this.taonMarketingPopupController.savePopup(input, id).request!().observable.pipe(
      map(res => res.body.json),
    );
  }

  public setEnabled(id: number, enabled: boolean): Observable<TaonMarketingPopupEntity> {
    return this.taonMarketingPopupController.setEnabled(id, enabled).request!().observable.pipe(
      map(res => res.body.json),
    );
  }

  public deletePopup(id: number): Observable<void> {
    return this.taonMarketingPopupController.deletePopup(id).request!().observable.pipe(
      map(() => undefined),
    );
  }
}