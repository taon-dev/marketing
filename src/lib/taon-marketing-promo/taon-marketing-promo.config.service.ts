//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonMarketingPromoProvider } from './taon-marketing-promo.provider';
//#endregion

@Injectable()
export class TaonMarketingPromoConfigService extends TaonBaseAngularService {
  private taonMarketingPromoProvider = this.inject(TaonMarketingPromoProvider);

  get isEnableOption() {
    return this.taonMarketingPromoProvider.enabledTaonMarketingPromoOption;
  }

  clone(): Partial<TaonMarketingPromoProvider> {
    const cloned = this.taonMarketingPromoProvider.clone();
    return cloned;
  }
}
