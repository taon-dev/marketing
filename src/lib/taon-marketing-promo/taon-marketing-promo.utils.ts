import { TaonMarketingPromoModels } from './taon-marketing-promo.models';

export namespace TaonMarketingPromoUtils {
  export function isActive(state: string): state is TaonMarketingPromoModels.TaonMarketingPromoState {
    return state === 'active';
  }
}