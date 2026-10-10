//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
import { TaonMarketingPopupController } from './taon-marketing-popup.controller';
//#endregion

@Injectable()
export class TaonMarketingPopupApiService extends TaonBaseAngularService {
  public readonly taonMarketingPopupController = this.injectController(TaonMarketingPopupController);

  public get allMyEntities$(): Observable<TaonMarketingPopupEntity[]> {
    return this.taonMarketingPopupController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonMarketingPopupController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}