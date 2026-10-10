//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonTaonMarketingAbConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'TaonMarketingAbProvider',
})
export class TaonMarketingAbProvider extends TaonBaseProvider {
  enabledTaonMarketingAbOption: boolean = true;
  config = new TaonTaonMarketingAbConfig();
  clone() {
    return {
      enabledTaonMarketingAbOption: this.enabledTaonMarketingAbOption,
      config: this.config.clone(),
    };
  }
}