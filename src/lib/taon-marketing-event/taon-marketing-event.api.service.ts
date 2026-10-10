//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonMarketingEventEntity } from './taon-marketing-event.entity';
import { TaonMarketingEventController } from './taon-marketing-event.controller';
//#endregion

@Injectable()
export class TaonMarketingEventApiService extends TaonBaseAngularService {
  private taonMarketingEventController = this.injectController(TaonMarketingEventController);

  public get allMyEntities$(): Observable<TaonMarketingEventEntity[]> {
    return this.taonMarketingEventController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonMarketingEventController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}