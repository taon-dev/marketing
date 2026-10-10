//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonTaonMarketingPromoConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'TaonMarketingPromoProvider',
})
export class TaonMarketingPromoProvider extends TaonBaseProvider {
  enabledTaonMarketingPromoOption: boolean = true;
  config = new TaonTaonMarketingPromoConfig();
  clone() {
    return {
      enabledTaonMarketingPromoOption: this.enabledTaonMarketingPromoOption,
      config: this.config.clone(),
    };
  }
}