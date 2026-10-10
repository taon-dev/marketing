//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonTaonMarketingNewsletterConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'TaonMarketingNewsletterProvider',
})
export class TaonMarketingNewsletterProvider extends TaonBaseProvider {
  enabledTaonMarketingNewsletterOption: boolean = true;
  config = new TaonTaonMarketingNewsletterConfig();
  clone() {
    return {
      enabledTaonMarketingNewsletterOption: this.enabledTaonMarketingNewsletterOption,
      config: this.config.clone(),
    };
  }
}