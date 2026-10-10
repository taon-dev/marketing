//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonTaonMarketingPopupConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'TaonMarketingPopupProvider',
})
export class TaonMarketingPopupProvider extends TaonBaseProvider {
  enabledTaonMarketingPopupOption: boolean = true;
  config = new TaonTaonMarketingPopupConfig();
  clone() {
    return {
      enabledTaonMarketingPopupOption: this.enabledTaonMarketingPopupOption,
      config: this.config.clone(),
    };
  }
}