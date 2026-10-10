//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonMarketingEventProvider } from './taon-marketing-event.provider';
//#endregion

@Injectable()
export class TaonMarketingEventConfigService extends TaonBaseAngularService {
  private taonMarketingEventProvider = this.injectProvider(TaonMarketingEventProvider);

  get isEnableOption() {
    return this.taonMarketingEventProvider.enabledTaonMarketingEventOption;
  }
}