//#region imports
import { Taon, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

@TaonProvider({
  className: 'TaonMarketingEventProvider',
})
export class TaonMarketingEventProvider extends TaonBaseProvider {
  enabledTaonMarketingEventOption: boolean = true;
}