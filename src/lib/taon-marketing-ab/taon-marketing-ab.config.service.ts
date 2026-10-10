//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonMarketingAbProvider } from './taon-marketing-ab.provider';
//#endregion

@Injectable()
export class TaonMarketingAbConfigService extends TaonBaseAngularService {
  private taonMarketingAbProvider = this.injectProvider(TaonMarketingAbProvider);

  get isEnableOption() {
    return this.taonMarketingAbProvider.enabledTaonMarketingAbOption;
  }

  clone(): Partial<TaonMarketingAbProvider> {
    const cloned = this.taonMarketingAbProvider.clone();
    return cloned;
  }
}