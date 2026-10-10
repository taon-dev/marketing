import { TaonMarketingPopupModels } from './taon-marketing-popup.models';

export namespace TaonMarketingPopupUtils {
  export function isActive(state: string): state is TaonMarketingPopupModels.TaonMarketingPopupState {
    return state === 'active';
  }
}