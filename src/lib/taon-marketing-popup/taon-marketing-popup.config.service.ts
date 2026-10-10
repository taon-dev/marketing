//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonMarketingPopupProvider } from './taon-marketing-popup.provider';
//#endregion

@Injectable()
export class TaonMarketingPopupConfigService extends TaonBaseAngularService {
  private taonMarketingPopupProvider = this.injectProvider(TaonMarketingPopupProvider);

  get isEnableOption() {
    return this.taonMarketingPopupProvider.enabledTaonMarketingPopupOption;
  }

  clone(): Partial<TaonMarketingPopupProvider> {
    const cloned = this.taonMarketingPopupProvider.clone();
    return cloned;
  }
}