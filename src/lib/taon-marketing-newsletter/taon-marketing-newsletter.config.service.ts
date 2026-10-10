//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonMarketingNewsletterProvider } from './taon-marketing-newsletter.provider';
//#endregion

@Injectable()
export class TaonMarketingNewsletterConfigService extends TaonBaseAngularService {
  private taonMarketingNewsletterProvider = this.injectProvider(TaonMarketingNewsletterProvider);

  get isEnableOption() {
    return this.taonMarketingNewsletterProvider.enabledTaonMarketingNewsletterOption;
  }

  clone(): Partial<TaonMarketingNewsletterProvider> {
    const cloned = this.taonMarketingNewsletterProvider.clone();
    return cloned;
  }
}