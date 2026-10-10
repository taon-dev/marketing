//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonMarketingPromoEntity } from './taon-marketing-promo.entity';
import { TaonMarketingPromoController } from './taon-marketing-promo.controller';
//#endregion

@Injectable()
export class TaonMarketingPromoApiService extends TaonBaseAngularService {
  public readonly taonMarketingPromoController = this.injectController(TaonMarketingPromoController);

  public get allMyEntities$(): Observable<TaonMarketingPromoEntity[]> {
    return this.taonMarketingPromoController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonMarketingPromoController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}