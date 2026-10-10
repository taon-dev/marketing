//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonMarketingNewsletterEntity } from './taon-marketing-newsletter.entity';
import { TaonMarketingNewsletterController } from './taon-marketing-newsletter.controller';
//#endregion

@Injectable()
export class TaonMarketingNewsletterApiService extends TaonBaseAngularService {
  public readonly taonMarketingNewsletterController = this.injectController(TaonMarketingNewsletterController);

  public get allMyEntities$(): Observable<TaonMarketingNewsletterEntity[]> {
    return this.taonMarketingNewsletterController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonMarketingNewsletterController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}