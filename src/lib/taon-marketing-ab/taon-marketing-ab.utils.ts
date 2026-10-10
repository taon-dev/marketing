import { TaonMarketingAbModels } from './taon-marketing-ab.models';

export namespace TaonMarketingAbUtils {
  export function isActive(state: string): state is TaonMarketingAbModels.TaonMarketingAbState {
    return state === 'active';
  }
}