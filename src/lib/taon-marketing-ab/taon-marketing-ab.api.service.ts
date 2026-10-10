//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonMarketingAbEntity } from './taon-marketing-ab.entity';
import { TaonMarketingAbController } from './taon-marketing-ab.controller';
//#endregion

@Injectable()
export class TaonMarketingAbApiService extends TaonBaseAngularService {
  public readonly taonMarketingAbController = this.injectController(TaonMarketingAbController);

  public get allMyEntities$(): Observable<TaonMarketingAbEntity[]> {
    return this.taonMarketingAbController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonMarketingAbController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}